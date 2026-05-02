"""PivotSafe backend — contact form lead capture + Resend email notifications."""
import asyncio
import logging
import os
import time
import uuid
from collections import deque
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Optional

import resend
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

# --- Config -----------------------------------------------------------------
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
RESEND_FROM = os.environ.get("RESEND_FROM", "onboarding@resend.dev")
RESEND_FALLBACK_FROM = os.environ.get("RESEND_FALLBACK_FROM", "onboarding@resend.dev")
CONTACT_TO = os.environ.get("CONTACT_TO", "hello@pivotsafe.com")
RATE_LIMIT_PER_HOUR = int(os.environ.get("CONTACT_RATE_LIMIT_PER_HOUR", "3"))
ALLOWED_ORIGINS_RAW = os.environ.get("ALLOWED_ORIGINS", "*")
ALLOWED_ORIGINS = [o.strip() for o in ALLOWED_ORIGINS_RAW.split(",") if o.strip()]
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN")  # required to access /api/contact/_admin/*
APP_VERSION = os.environ.get("APP_VERSION", "1.0.0")

resend.api_key = RESEND_API_KEY

# --- Logging ----------------------------------------------------------------
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("pivotsafe")


# --- Mongo ------------------------------------------------------------------
mongo_client = AsyncIOMotorClient(MONGO_URL)
db = mongo_client[DB_NAME]
leads_col = db["contact_leads"]


async def _ensure_indexes() -> None:
    """Idempotent — safe to call on every startup."""
    try:
        await leads_col.create_index("id", unique=True, name="idx_lead_id")
        await leads_col.create_index([("created_at", -1)], name="idx_lead_created_desc")
        await leads_col.create_index([("ip", 1), ("created_at", -1)], name="idx_ip_created")
        await leads_col.create_index("email_status", name="idx_email_status")
        logger.info("MongoDB indexes ensured on %s.contact_leads", DB_NAME)
    except Exception as exc:  # noqa: BLE001
        logger.error("Failed to ensure MongoDB indexes: %s", exc)


@asynccontextmanager
async def lifespan(app: FastAPI):  # type: ignore[unused-argument]
    await _ensure_indexes()
    yield
    mongo_client.close()


# --- App --------------------------------------------------------------------
app = FastAPI(
    title="PivotSafe API",
    version=APP_VERSION,
    docs_url=None,  # disable interactive docs in prod by default
    redoc_url=None,
    openapi_url=None,
    lifespan=lifespan,
)

# CORS — explicit origins only when ALLOWED_ORIGINS != "*". The wildcard is
# convenient for the preview environment; tighten in production via env.
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS or ["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=600,
)


# --- Rate limiter (in-process, per-IP rolling 1-hour window) ----------------
_rate_buckets: dict[str, deque[float]] = {}


def _client_ip(request: Request) -> str:
    """Right-most untrusted hop heuristic.

    The platform's ingress sets X-Forwarded-For in the form
    "<client>, <proxy1>, <proxy2>". We trust the *left-most* address as the
    original client (since our own ingress is the only proxy in the chain).
    For production behind multiple proxies, prefer a known-proxy whitelist.
    """
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _check_rate_limit(ip: str) -> bool:
    now = time.time()
    window_start = now - 3600
    bucket = _rate_buckets.setdefault(ip, deque())
    while bucket and bucket[0] < window_start:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT_PER_HOUR:
        return False
    bucket.append(now)
    return True


def _release_rate_limit(ip: str) -> None:
    """Roll back a rate-limit slot — used when honeypot tripped (no real cost)."""
    bucket = _rate_buckets.get(ip)
    if bucket:
        try:
            bucket.pop()
        except IndexError:
            pass


# --- Auth dep for admin routes ---------------------------------------------
def require_admin(authorization: Optional[str] = Header(default=None)) -> None:
    if not ADMIN_TOKEN:
        # Fail closed: if no admin token is configured, route is unreachable.
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing bearer token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = authorization.split(" ", 1)[1].strip()
    if token != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


# --- Models -----------------------------------------------------------------
class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=5, max_length=4000)
    company: Optional[str] = Field(default=None, max_length=160)
    # Honeypot — real users leave this empty; bots typically fill it.
    website: Optional[str] = Field(default="", max_length=500)


class ContactResponse(BaseModel):
    id: str
    status: str = "received"
    message: str = "Thanks — we'll get back to you within one business day."


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    db: str


# --- Email rendering --------------------------------------------------------
def _escape_html(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#39;")
    )


def _render_lead_email(lead: dict) -> str:
    safe_msg = _escape_html(lead.get("message") or "").replace("\n", "<br>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#0f0f0f;padding:24px;">
      <tr><td>
        <table width="600" align="center" cellpadding="0" cellspacing="0"
               style="background:#141414;border:1px solid #222;border-radius:12px;color:#eaeaea;">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #222;">
            <h1 style="margin:0;font-size:20px;color:#bb8922;">New PivotSafe Lead</h1>
            <p style="margin:4px 0 0;font-size:12px;color:#888;">Submitted {_escape_html(lead['created_at'])}</p>
          </td></tr>
          <tr><td style="padding:20px 28px;font-size:14px;line-height:1.6;">
            <p style="margin:0 0 6px;"><strong>Name:</strong> {_escape_html(lead['name'])}</p>
            <p style="margin:0 0 6px;"><strong>Email:</strong> <a href="mailto:{_escape_html(lead['email'])}" style="color:#bb8922;">{_escape_html(lead['email'])}</a></p>
            <p style="margin:0 0 18px;"><strong>Company:</strong> {_escape_html(lead.get('company') or '—')}</p>
            <p style="margin:0 0 6px;color:#aaa;">Message:</p>
            <div style="background:#0f0f0f;border:1px solid #222;border-radius:8px;padding:14px;white-space:pre-wrap;">{safe_msg}</div>
          </td></tr>
          <tr><td style="padding:14px 28px;border-top:1px solid #222;font-size:11px;color:#666;">
            Lead id: {_escape_html(lead['id'])} · IP: {_escape_html(lead.get('ip', '—'))}
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_lead_email(lead: dict) -> Optional[str]:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY missing — skipping email send for lead %s", lead["id"])
        return None
    base_params = {
        "to": [CONTACT_TO],
        "reply_to": lead["email"],
        "subject": f"New PivotSafe lead: {lead['name']}",
        "html": _render_lead_email(lead),
    }
    senders = [RESEND_FROM]
    if RESEND_FALLBACK_FROM and RESEND_FALLBACK_FROM != RESEND_FROM:
        senders.append(RESEND_FALLBACK_FROM)

    last_error: Optional[str] = None
    for idx, sender in enumerate(senders):
        params = {**base_params, "from": sender}
        try:
            result = await asyncio.to_thread(resend.Emails.send, params)
            email_id = result.get("id") if isinstance(result, dict) else None
            if idx > 0:
                logger.warning(
                    "Resend primary sender %s failed (%s); succeeded via fallback %s for lead %s",
                    RESEND_FROM, last_error, sender, lead["id"],
                )
            return email_id
        except Exception as exc:  # noqa: BLE001
            last_error = str(exc)
            logger.warning(
                "Resend send via %s failed for lead %s: %s",
                sender, lead["id"], exc,
            )
    logger.error("All Resend senders failed for lead %s: %s", lead["id"], last_error)
    return None


# --- Routes -----------------------------------------------------------------
@app.get("/api/health", response_model=HealthResponse)
async def health():
    db_status = "ok"
    try:
        await mongo_client.admin.command("ping")
    except Exception as exc:  # noqa: BLE001
        logger.error("Mongo ping failed: %s", exc)
        db_status = "down"
    return HealthResponse(
        status="ok" if db_status == "ok" else "degraded",
        service="pivotsafe-api",
        version=APP_VERSION,
        db=db_status,
    )


@app.post("/api/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(payload: ContactRequest, request: Request):
    ip = _client_ip(request)

    # Honeypot — silently accept (return generic success) to not tip off bots
    if payload.website:
        logger.info("Honeypot triggered from %s", ip)
        return ContactResponse(id="honeypot", status="received")

    if not _check_rate_limit(ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many requests. Please try again in an hour (limit: {RATE_LIMIT_PER_HOUR}/hour).",
        )

    lead = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "company": (payload.company or "").strip() or None,
        "message": payload.message.strip(),
        "ip": ip,
        "user_agent": request.headers.get("user-agent", "")[:500],
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_id": None,
        "email_status": "pending",
    }

    # Persist first — never lose a lead even if email fails. We don't block on
    # DB insert exceptions either: the email is still attempted so the team
    # gets the notification even if Mongo is temporarily down.
    try:
        await leads_col.insert_one({**lead})
        persisted = True
    except Exception as exc:  # noqa: BLE001
        logger.error("Mongo insert failed for lead %s: %s", lead["id"], exc)
        persisted = False

    email_id = await _send_lead_email(lead)
    email_status = "sent" if email_id else "failed"

    if persisted:
        try:
            await leads_col.update_one(
                {"id": lead["id"]},
                {"$set": {"email_id": email_id, "email_status": email_status}},
            )
        except Exception as exc:  # noqa: BLE001
            logger.error("Mongo update failed for lead %s: %s", lead["id"], exc)

    if not persisted and not email_id:
        # Total failure — both notify channels down. Fail loud.
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Couldn't deliver your message right now. Please email hello@pivotsafe.com directly.",
        )

    logger.info(
        "Lead received id=%s ip=%s email_status=%s persisted=%s",
        lead["id"], ip, email_status, persisted,
    )
    return ContactResponse(id=lead["id"])


@app.get("/api/contact/_admin/recent", dependencies=[Depends(require_admin)])
async def list_recent_leads(limit: int = 20):
    """Admin-only diagnostic — last N leads. Requires ADMIN_TOKEN bearer auth."""
    cursor = leads_col.find({}, {"_id": 0}).sort("created_at", -1).limit(min(limit, 100))
    return {"items": await cursor.to_list(length=limit)}
