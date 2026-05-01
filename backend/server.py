"""PivotSafe backend — contact form lead capture + Resend email notifications."""
import asyncio
import logging
import os
import time
import uuid
from collections import deque
from datetime import datetime, timezone
from typing import Optional

import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
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
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

resend.api_key = RESEND_API_KEY

# --- Logging ----------------------------------------------------------------
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("pivotsafe")

# --- App + DB ---------------------------------------------------------------
app = FastAPI(title="PivotSafe API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_client = AsyncIOMotorClient(MONGO_URL)
db = mongo_client[DB_NAME]
leads_col = db["contact_leads"]


# --- Rate limiter (in-process, per-IP rolling 1-hour window) ----------------
_rate_buckets: dict[str, deque[float]] = {}


def _client_ip(request: Request) -> str:
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


# --- Email rendering --------------------------------------------------------
def _render_lead_email(lead: dict) -> str:
    safe_msg = (lead.get("message") or "").replace("\n", "<br>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#0f0f0f;padding:24px;">
      <tr><td>
        <table width="600" align="center" cellpadding="0" cellspacing="0"
               style="background:#141414;border:1px solid #222;border-radius:12px;color:#eaeaea;">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #222;">
            <h1 style="margin:0;font-size:20px;color:#bb8922;">New PivotSafe Lead</h1>
            <p style="margin:4px 0 0;font-size:12px;color:#888;">Submitted {lead['created_at']}</p>
          </td></tr>
          <tr><td style="padding:20px 28px;font-size:14px;line-height:1.6;">
            <p style="margin:0 0 6px;"><strong>Name:</strong> {lead['name']}</p>
            <p style="margin:0 0 6px;"><strong>Email:</strong> <a href="mailto:{lead['email']}" style="color:#bb8922;">{lead['email']}</a></p>
            <p style="margin:0 0 18px;"><strong>Company:</strong> {lead.get('company') or '—'}</p>
            <p style="margin:0 0 6px;color:#aaa;">Message:</p>
            <div style="background:#0f0f0f;border:1px solid #222;border-radius:8px;padding:14px;white-space:pre-wrap;">{safe_msg}</div>
          </td></tr>
          <tr><td style="padding:14px 28px;border-top:1px solid #222;font-size:11px;color:#666;">
            Lead id: {lead['id']} · IP: {lead.get('ip', '—')}
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
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "pivotsafe-api"}


@app.post("/api/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(payload: ContactRequest, request: Request):
    # Honeypot — silently accept (return generic success) to not tip off bots
    if payload.website:
        logger.info("Honeypot triggered from %s", _client_ip(request))
        return ContactResponse(id="honeypot", status="received")

    ip = _client_ip(request)
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
        "user_agent": request.headers.get("user-agent", ""),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_id": None,
        "email_status": "pending",
    }

    # Persist first — never lose a lead even if email fails
    await leads_col.insert_one({**lead})

    email_id = await _send_lead_email(lead)
    await leads_col.update_one(
        {"id": lead["id"]},
        {"$set": {
            "email_id": email_id,
            "email_status": "sent" if email_id else "failed",
        }},
    )

    return ContactResponse(id=lead["id"])


@app.get("/api/contact/_admin/recent")
async def list_recent_leads(limit: int = 20):
    """Lightweight diagnostic — last N leads. Not auth-protected; remove or guard before production."""
    cursor = leads_col.find({}, {"_id": 0}).sort("created_at", -1).limit(min(limit, 100))
    return {"items": await cursor.to_list(length=limit)}
