# PivotSafe Website

PivotSafe — adversary simulation, red team operations, application security,
ICS/SCADA security, and AI red teaming. This repo contains the marketing site
and the lightweight contact-form API behind the "Book a Free Consultation"
modal.

## Architecture

```
/app
├── frontend/        Next.js 15 (App Router), React 19, TS, Tailwind, R3F (three.js)
└── backend/         FastAPI 0.110, Motor (async MongoDB), Resend transactional email
```

- **Frontend** runs on **port 3000** (Next.js).
- **Backend** runs on **port 8001** (FastAPI / uvicorn) — all routes are prefixed
  with `/api`. The platform's ingress automatically routes `/api/*` to 8001 and
  everything else to 3000.
- **MongoDB** is local (`mongodb://localhost:27017`, db `pivotsafe`,
  collection `contact_leads`).

Both services are managed by **supervisor**.

## Environment variables

Copy the example files and fill values:

```bash
cp /app/backend/.env.example  /app/backend/.env
cp /app/frontend/.env.example /app/frontend/.env
```

### Backend (`/app/backend/.env`)

| Var | Purpose |
| --- | --- |
| `MONGO_URL` | Mongo connection string |
| `DB_NAME` | Database name (`pivotsafe`) |
| `RESEND_API_KEY` | Resend API key (`re_…`) |
| `RESEND_FROM` | Verified domain sender, e.g. `PivotSafe <noreply@pivotsafe.com>` |
| `RESEND_FALLBACK_FROM` | Sandbox sender used only if the primary is rejected |
| `CONTACT_TO` | Lead notification recipient (`hello@pivotsafe.com`) |
| `CONTACT_RATE_LIMIT_PER_HOUR` | Rolling 1-hour cap per IP (default `3`) |
| `ALLOWED_ORIGINS` | Comma-separated CORS allow-list. Use `*` only in dev. |
| `ADMIN_TOKEN` | Bearer token gating `/api/contact/_admin/*`. If empty, those routes 404 (fail-closed). Generate with `python -c "import secrets; print('ps_admin_' + secrets.token_hex(16))"` |
| `APP_VERSION` | Version string surfaced by `/api/health` |

### Frontend (`/app/frontend/.env`)

| Var | Purpose |
| --- | --- |
| `REACT_APP_BACKEND_URL` / `NEXT_PUBLIC_BACKEND_URL` | Public base URL of the backend |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — used for SEO metadata, OpenGraph, sitemap |
| `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` / `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` / `NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT` | Optional Contentful blog credentials. When unset, the site renders the "blogs coming soon" placeholder. |

## API surface

| Method & path | Auth | Purpose |
| --- | --- | --- |
| `GET /api/health` | none | Liveness + Mongo ping |
| `POST /api/contact` | none | Lead capture (validates, rate-limits per-IP, persists, emails) |
| `GET /api/contact/_admin/recent` | `Authorization: Bearer $ADMIN_TOKEN` | Diagnostic — last N leads |

### `POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme",          // optional
  "message": "We want a red team engagement.",
  "website": ""               // honeypot — must be empty
}
```

- **201** — `{ id, status: "received", message }` on success.
- **422** — Pydantic validation array (frontend extracts each `msg`).
- **429** — `{ detail: "Too many requests…" }` (per-IP rolling-hour limit).
- **503** — Both Mongo and Resend are down (rare, alert-worthy).

The handler:
1. Checks the **honeypot** (`website`) field. If populated → silent 201, no DB
   write, no email, rate-limit slot rolled back.
2. Enforces a per-IP **rolling 1-hour rate limit** (default 3 req/hr).
3. **Persists** the lead in MongoDB *first* (so we never lose a lead if Resend
   is down).
4. **Emails** via Resend, retrying with the sandbox sender if the verified
   domain is rejected (DNS propagation insurance).
5. Updates the stored lead with `email_status` and Resend `email_id`.

## Security hardening

- CORS is locked to the configured `ALLOWED_ORIGINS`; `*` is intended only
  for the preview environment.
- FastAPI `/docs`, `/redoc`, and `/openapi.json` are **disabled** (404) so we
  don't leak schema in production.
- `/api/contact/_admin/*` requires a bearer token; when no token is
  configured, the routes return **404** (fail-closed).
- All HTML rendered into outbound emails is HTML-escaped (no XSS via lead
  content).
- MongoDB indexes (`id` unique, `created_at` desc, `(ip, created_at)`,
  `email_status`) are created idempotently on startup.
- Honeypot field + per-IP rate limiting block trivial automated submissions.

## Development

```bash
# Backend
cd /app/backend && /root/.venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend (hot reload)
cd /app/frontend && yarn dev
```

Or simply rely on supervisor (`sudo supervisorctl status`) — both services are
already managed.

## Production build

The frontend is a static-friendly Next.js app:

```bash
cd /app/frontend && yarn build && yarn next start -p 3000 -H 0.0.0.0
```

`yarn build` will fail loudly on TypeScript errors, lint errors, hydration
issues, and missing route data — keep it green.

## Backlog / production todos

- Move the rate-limit bucket from in-process `deque` to Redis or a Mongo TTL
  collection so it survives restarts and scales horizontally.
- Rotate `ADMIN_TOKEN` on a regular schedule (or migrate to per-admin JWTs).
- 12-month TTL on `contact_leads` (PII retention).
- Optional Slack/Discord webhook on each lead for real-time pings.
- Re-enable the Contentful blog flow once content is published (just set
  the `NEXT_PUBLIC_CONTENTFUL_*` env vars).
