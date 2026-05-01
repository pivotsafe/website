"""Iteration 2 — production-hardening tests for PivotSafe backend.

Covers:
  - /api/health structure
  - Admin bearer guard on /api/contact/_admin/recent
  - FastAPI docs disabled (/docs, /redoc, /openapi.json -> 404)
  - CORS allowlist (allowed origin echoed, evil origin not echoed)
  - Happy-path lead persistence with user_agent capping + new fields
  - Honeypot rate-limit rollback (no 429 even after spamming honeypot)
  - Validation: short message/invalid email/missing name -> 422 with Pydantic v2 error array
  - Rate limit on a fresh IP not used in iteration 1
  - MongoDB indexes on contact_leads
"""
import os
import time
import uuid

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient

BASE_URL = (
    os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
    or "https://d168efa5-18f0-47c3-8e38-068a4e8570ba.preview.emergentagent.com"
)

_ENV = dotenv_values("/app/backend/.env")
ADMIN_TOKEN = _ENV.get("ADMIN_TOKEN")
MONGO_URL = _ENV.get("MONGO_URL")
DB_NAME = _ENV.get("DB_NAME")


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health ----------------------------------------------------------------
class TestHealth:
    def test_health_full_structure(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "ok"
        assert data["service"] == "pivotsafe-api"
        assert isinstance(data.get("version"), str) and len(data["version"]) > 0
        assert data["db"] == "ok"


# --- Admin bearer auth -----------------------------------------------------
class TestAdminAuth:
    def test_no_auth_returns_401(self, api):
        r = api.get(f"{BASE_URL}/api/contact/_admin/recent", timeout=10)
        assert r.status_code == 401, r.text

    def test_wrong_token_returns_401(self, api):
        r = api.get(
            f"{BASE_URL}/api/contact/_admin/recent",
            headers={"Authorization": "Bearer not-the-real-token"},
            timeout=10,
        )
        assert r.status_code == 401, r.text

    def test_correct_token_returns_200_and_list(self, api):
        assert ADMIN_TOKEN, "ADMIN_TOKEN missing in /app/backend/.env"
        r = api.get(
            f"{BASE_URL}/api/contact/_admin/recent",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=15,
        )
        assert r.status_code == 200, r.text
        body = r.json()
        # Endpoint returns {"items": [...]}; treat that as the list of leads.
        items = body["items"] if isinstance(body, dict) else body
        assert isinstance(items, list)


# --- Docs disabled ---------------------------------------------------------
class TestDocsDisabled:
    @pytest.mark.parametrize("path", ["/docs", "/redoc", "/openapi.json"])
    def test_docs_route_disabled(self, api, path):
        r = api.get(f"{BASE_URL}{path}", timeout=10, allow_redirects=False)
        assert r.status_code == 404, f"{path} -> {r.status_code} {r.text[:200]}"


# --- CORS ------------------------------------------------------------------
# NOTE: Public preview ingress (Cloudflare) rewrites CORS to '*'. CORS is a
# backend concern, so we assert against the backend directly via localhost.
LOCAL_BACKEND = "http://localhost:8001"


class TestCORS:
    def test_allowed_origin_echoed(self, api):
        r = api.options(
            f"{LOCAL_BACKEND}/api/contact",
            headers={
                "Origin": "https://pivotsafe.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
            timeout=10,
        )
        assert r.status_code in (200, 204), r.text
        assert r.headers.get("access-control-allow-origin") == "https://pivotsafe.com"

    def test_disallowed_origin_not_echoed(self, api):
        r = api.options(
            f"{LOCAL_BACKEND}/api/contact",
            headers={
                "Origin": "https://evil.example.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
            timeout=10,
        )
        acao = r.headers.get("access-control-allow-origin")
        assert acao != "https://evil.example.com"
        # Backend should reject (no ACAO) or return error for disallowed origin
        assert acao is None


# --- Happy path with user_agent + persistence ------------------------------
class TestHappyPathPersistence:
    def test_lead_persisted_with_full_metadata(self, api):
        ip = "198.51.100.10"  # fresh IP for iteration 2
        long_ua = "TEST_UA_" + ("x" * 700)  # >500 chars to verify capping
        payload = {
            "name": "TEST_iter2_HappyPath",
            "email": "test-iter2@example.com",
            "message": "TEST_iter2 happy path message body for hardening tests.",
            "company": "TEST_iter2_Acme",
        }
        r = api.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"X-Forwarded-For": ip, "User-Agent": long_ua},
            timeout=30,
        )
        assert r.status_code == 201, r.text
        lead_id = r.json()["id"]
        assert lead_id != "honeypot"

        time.sleep(1)
        r2 = api.get(
            f"{BASE_URL}/api/contact/_admin/recent?limit=100",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=15,
        )
        assert r2.status_code == 200
        items = r2.json().get("items", [])
        match = next((it for it in items if it.get("id") == lead_id), None)
        assert match is not None, "Lead not persisted"
        assert match["ip"] == ip
        assert "created_at" in match
        assert "user_agent" in match
        assert len(match["user_agent"]) <= 500
        assert match["user_agent"].startswith("TEST_UA_")
        assert match["email_status"] in ("sent", "failed")
        if match["email_status"] == "sent":
            assert match["email_id"], "email_id should be populated when sent"


# --- Honeypot rate-limit rollback -----------------------------------------
class TestHoneypotRateLimitRollback:
    def test_honeypot_does_not_consume_rate_limit(self, api):
        ip = "198.51.100.55"  # fresh IP

        # Spam honeypot way more than RATE_LIMIT_PER_HOUR (=3)
        for i in range(6):
            r = api.post(
                f"{BASE_URL}/api/contact",
                json={
                    "name": f"TEST_iter2_HONEY_{i}_{uuid.uuid4().hex[:6]}",
                    "email": "bot@example.com",
                    "message": "Bot message please ignore.",
                    "website": "http://spam.example",
                },
                headers={"X-Forwarded-For": ip},
                timeout=10,
            )
            assert r.status_code == 201, r.text
            assert r.json()["id"] == "honeypot"

        # Now a legit submission from the SAME IP must NOT be rate-limited
        r2 = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_iter2_AfterHoneypot",
                "email": "after-honeypot@example.com",
                "message": "TEST_iter2 verifying honeypot rolled back rate-limit slot.",
            },
            headers={"X-Forwarded-For": ip},
            timeout=30,
        )
        assert r2.status_code == 201, (
            f"Honeypot did NOT roll back rate-limit slot. Got {r2.status_code} {r2.text}"
        )


# --- Validation (Pydantic v2 errors) --------------------------------------
class TestValidation:
    def test_short_message_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_iter2_ShortMsg",
                "email": "shortmsg@example.com",
                "message": "hi",
            },
            headers={"X-Forwarded-For": "198.51.100.71"},
            timeout=10,
        )
        assert r.status_code == 422, r.text
        body = r.json()
        assert isinstance(body.get("detail"), list)
        assert any("message" in (err.get("loc") or []) for err in body["detail"])

    def test_invalid_email_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_iter2_BadEmail",
                "email": "definitely-not-email",
                "message": "Valid long enough message body here.",
            },
            headers={"X-Forwarded-For": "198.51.100.72"},
            timeout=10,
        )
        assert r.status_code == 422, r.text
        body = r.json()
        assert isinstance(body.get("detail"), list)
        assert any("email" in (err.get("loc") or []) for err in body["detail"])

    def test_missing_name_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "email": "missingname@example.com",
                "message": "Valid long enough message body here.",
            },
            headers={"X-Forwarded-For": "198.51.100.73"},
            timeout=10,
        )
        assert r.status_code == 422, r.text
        body = r.json()
        assert isinstance(body.get("detail"), list)
        assert any("name" in (err.get("loc") or []) for err in body["detail"])


# --- Rate limit on fresh IP -----------------------------------------------
class TestRateLimitFreshIP:
    def test_rate_limit_after_three_valid(self, api):
        ip = "198.51.100.200"  # NOT used in iteration 1
        for i in range(3):
            r = api.post(
                f"{BASE_URL}/api/contact",
                json={
                    "name": f"TEST_iter2_RL_{i}",
                    "email": f"rl-{i}@example.com",
                    "message": "TEST_iter2 valid rate-limit message body.",
                },
                headers={"X-Forwarded-For": ip},
                timeout=30,
            )
            assert r.status_code == 201, f"#{i+1} -> {r.status_code} {r.text}"

        r4 = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_iter2_RL_4",
                "email": "rl-4@example.com",
                "message": "TEST_iter2 valid rate-limit message body.",
            },
            headers={"X-Forwarded-For": ip},
            timeout=15,
        )
        assert r4.status_code == 429, r4.text


# --- Mongo indexes --------------------------------------------------------
class TestMongoIndexes:
    def test_contact_leads_indexes_present(self):
        assert MONGO_URL and DB_NAME, "MONGO_URL/DB_NAME missing in .env"
        client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        try:
            indexes = list(client[DB_NAME]["contact_leads"].list_indexes())
            names = {ix["name"] for ix in indexes}
            assert "idx_lead_id" in names
            assert "idx_lead_created_desc" in names
            assert "idx_ip_created" in names
            assert "idx_email_status" in names
            # Verify uniqueness on idx_lead_id
            id_idx = next(ix for ix in indexes if ix["name"] == "idx_lead_id")
            assert id_idx.get("unique") is True
        finally:
            client.close()
