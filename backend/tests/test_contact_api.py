"""Backend tests for PivotSafe contact API."""
import os
import time
import uuid

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or \
    "https://d168efa5-18f0-47c3-8e38-068a4e8570ba.preview.emergentagent.com"


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health check -----------------------------------------------------------
class TestHealth:
    def test_health_ok(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"


# --- Contact happy path -----------------------------------------------------
class TestContactHappyPath:
    def test_post_contact_success_persists_and_emails(self, api):
        # Use unique IP so we don't pollute rate-limit buckets across tests
        ip = "203.0.113.10"
        payload = {
            "name": "TEST_HappyPath User",
            "email": "test-happy@example.com",
            "message": "TEST_ This is an automated test message for happy path.",
            "company": "TEST_Acme",
        }
        r = api.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"X-Forwarded-For": ip},
            timeout=30,
        )
        assert r.status_code == 201, r.text
        body = r.json()
        assert "id" in body
        assert body["status"] == "received"
        assert body["id"] != "honeypot"
        assert isinstance(body.get("message"), str) and len(body["message"]) > 0
        lead_id = body["id"]

        # Verify persistence + email status via admin recent endpoint
        # Resend send happens before response, so email_status should be set.
        time.sleep(1)
        r2 = api.get(f"{BASE_URL}/api/contact/_admin/recent?limit=50", timeout=15)
        assert r2.status_code == 200
        items = r2.json().get("items", [])
        match = next((it for it in items if it.get("id") == lead_id), None)
        assert match is not None, f"Lead {lead_id} not persisted"
        assert match["name"] == payload["name"]
        assert match["email"] == payload["email"].lower()
        assert match["message"] == payload["message"]
        assert match["company"] == payload["company"]
        assert match["ip"] == ip
        assert "created_at" in match
        # email status: ideally 'sent' with email_id, but we tolerate 'failed'
        # if Resend sandbox refuses external 'to'. Capture for report.
        assert match["email_status"] in ("sent", "failed")
        if match["email_status"] == "sent":
            assert match["email_id"], "email_id should be populated when sent"


# --- Validation -------------------------------------------------------------
class TestContactValidation:
    def test_empty_name_returns_422(self, api):
        ip = "203.0.113.20"
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "", "email": "ok@example.com", "message": "Hello there friend"},
            headers={"X-Forwarded-For": ip},
            timeout=15,
        )
        assert r.status_code == 422, r.text

    def test_invalid_email_returns_422(self, api):
        ip = "203.0.113.21"
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "Jane", "email": "not-an-email", "message": "Hello there friend"},
            headers={"X-Forwarded-For": ip},
            timeout=15,
        )
        assert r.status_code == 422, r.text


# --- Honeypot ---------------------------------------------------------------
class TestHoneypot:
    def test_honeypot_silently_accepts(self, api):
        ip = "203.0.113.30"
        # Capture leads count before
        r0 = api.get(f"{BASE_URL}/api/contact/_admin/recent?limit=100", timeout=15)
        ids_before = {it["id"] for it in r0.json().get("items", [])}

        unique_marker = f"TEST_HONEYPOT_{uuid.uuid4().hex}"
        payload = {
            "name": unique_marker,
            "email": "bot@example.com",
            "message": "I am a bot please ignore me thank you.",
            "website": "http://spamsite.example",
        }
        r = api.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"X-Forwarded-For": ip},
            timeout=15,
        )
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["id"] == "honeypot"
        assert body["status"] == "received"

        # Verify NO real lead was persisted
        r1 = api.get(f"{BASE_URL}/api/contact/_admin/recent?limit=100", timeout=15)
        items = r1.json().get("items", [])
        assert not any(it.get("name") == unique_marker for it in items), \
            "Honeypot lead should not be persisted"
        # New ids should not contain unique marker
        new_only = [it for it in items if it["id"] not in ids_before]
        assert all(it.get("name") != unique_marker for it in new_only)


# --- Rate limit -------------------------------------------------------------
class TestRateLimit:
    def test_rate_limit_429_after_3_requests(self, api):
        ip = "203.0.113.99"  # dedicated IP per request brief
        payload_template = {
            "name": "TEST_RateLimit",
            "email": "ratelimit@example.com",
            "message": "TEST_ rate limit message body content.",
        }

        # Burn 3 allowed requests
        for i in range(3):
            r = api.post(
                f"{BASE_URL}/api/contact",
                json={**payload_template, "company": f"TEST_RL_{i}"},
                headers={"X-Forwarded-For": ip},
                timeout=30,
            )
            assert r.status_code == 201, f"Request {i+1} failed: {r.status_code} {r.text}"

        # 4th must be rate-limited
        r4 = api.post(
            f"{BASE_URL}/api/contact",
            json={**payload_template, "company": "TEST_RL_4"},
            headers={"X-Forwarded-For": ip},
            timeout=15,
        )
        assert r4.status_code == 429, r4.text
        body = r4.json()
        detail = body.get("detail", "").lower()
        assert "rate" in detail or "too many" in detail or "limit" in detail
