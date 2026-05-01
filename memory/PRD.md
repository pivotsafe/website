# Pivot Safe – Website + Contact API PRD

## Original Problem Statement
Fine-tune the Pivot Safe website (Next.js, source shared via zip `pivot-safe-master.zip`). Apply content/navigation updates, then upgrade the contact CTA from a `mailto:` link to a real API-backed contact form with persistence, transactional email, success state, and spam protection.

## Architecture / Tech Stack
- **Frontend** (`/app/frontend`): Next.js 15 (App Router) + React 19 + TypeScript + Tailwind + Framer Motion + @tabler/icons + lucide-react. Dev server: `next dev -p 3000 -H 0.0.0.0` via supervisor `frontend` program (port 3000).
- **Backend** (`/app/backend`): FastAPI 0.110 + Motor (async MongoDB) + Resend SDK 2.29 + Pydantic v2. Run by supervisor `backend` program: `uvicorn server:app --host 0.0.0.0 --port 8001 --workers 1 --reload`.
- **DB**: Local MongoDB at `mongodb://localhost:27017`, db `pivotsafe`, collection `contact_leads`.
- **Email**: Resend transactional API. From: `PivotSafe <onboarding@resend.dev>` (sandbox until `pivotsafe.com` DNS is verified). To: `hello@pivotsafe.com`.

### Env vars
**`/app/backend/.env`**
- `MONGO_URL`, `DB_NAME=pivotsafe`
- `RESEND_API_KEY` (re_…)
- `RESEND_FROM` (display name + address)
- `CONTACT_TO=hello@pivotsafe.com`
- `CONTACT_RATE_LIMIT_PER_HOUR=3`
- `ALLOWED_ORIGINS=*`

**`/app/frontend/.env`**
- `REACT_APP_BACKEND_URL` & `NEXT_PUBLIC_BACKEND_URL` (both → external preview URL)
- Exposed to the client bundle via `next.config.mjs` `env` block

## Implemented (Jan 2026)

### Brand mark (new)
- `src/components/custom/brandLogo.tsx` — reusable left-aligned lockup (gold-accented `⎑` glyph badge + `Pivot`+gold `Safe` wordmark, 3 sizes, optional link). Replaces the previous split layout where the `⎑` glyph drifted to the far-right under `justify-between`.
- Applied site-wide via mass-replace: hero (`size="lg"`), floating navbar (`size="md"`), footer (`size="md"`), and **all 14 inner pages** (blogs index/slug/loading/not-found/error, cloud_security, ics_scada_security, real-world-skills, penetration_testing, adversary-simulation-red-team-ops, software_security, embedded_iot_security, ai_red_teaming, adversary_simulation).

### Real client logos
- New PNG/SVG assets dropped in `/app/frontend/public/clients/`: NASA, Comcast, CrowdStrike, Deutsche Telekom, Ferrero, KOHO, Monash, Outbrain, Sezzle, ClickHouse, TrafficJunky.
- Old placeholder logos (aidbase / lede / marblism / notion / paddle / zerotosaas) deleted.
- `trustedClientsMovingCards.tsx` rewritten to consume `{src, alt}[]` items.
- `infinite-moving-client-cards.tsx` rewritten:
  - Each logo on a soft white chip (160×64, rounded-md, subtle shadow) so PNGs without alpha read clean against PivotSafe's near-black bg.
  - `useCallback` for `addAnimation` (fixes hook-deps); marquee speed slowed to 90s for "slow"; mask-image gradient eased.

### Resend domain switch
- `RESEND_FROM` now `PivotSafe <noreply@pivotsafe.com>` (verified domain).
- New `RESEND_FALLBACK_FROM` env var. `_send_lead_email` now tries the verified domain first and gracefully falls back to the Resend sandbox sender if Resend rejects the primary (e.g. during DNS propagation). Verified live: when `pivotsafe.com` was still propagating, the fallback caught the send and the lead landed in `hello@pivotsafe.com` with `email_status=sent`.

### Website content (initial pass)
Hero CTA, Services (Application Security rename + new descriptions for ICS/SCADA, Embedded & IoT, AI Red Teaming), Training (removed Mobile App Hacker's Handbook), Recent Blogs hidden, Footer Home → `/`, Adversary-Sim page (Embedded & IoT section removed), Real-World Skills training modules rewritten to the 6 requested items, Application Security page renames. Logos kept as placeholders.

### Code-review fixes
- Hook deps fixed in `shapeThree`, `otherShapeThree`, `Gradientdiv`, `cards-demo-3`.
- Array-index keys replaced with stable identifiers in `marquee`, `otherShapeThree`, `blogPagination`, `blogList`.
- Console statements gated by `NODE_ENV === "development"` in `blogService.ts`, `blogs/[slug]/page.tsx`, `blogs/[slug]/error.tsx`.

### UX polish
- ICS/SCADA service card: grew card height to `30rem`, description uses `flex-1 leading-relaxed pb-4` so long copy fits inside the box.

### Contact form (new)
- **Backend `/api/contact` (POST)**: validates name/email/message via Pydantic v2 + EmailStr, persists lead to `contact_leads` first (never lose a lead), then sends Resend email via `asyncio.to_thread`, then updates `email_status`/`email_id` on the stored record.
- **Honeypot**: hidden `website` field. If populated, the API short-circuits with a generic 201 `id=honeypot` (no DB write, no email) — bots can't tell they were caught.
- **Rate limiter**: in-process per-IP rolling 1-hour bucket (deque). Default 3 req/hr; configurable via env. Returns 429 with a friendly `detail` over the limit.
- **`/api/contact/_admin/recent` (GET)**: diagnostic-only, returns the most recent leads with `_id` projected out. Flagged in code as "remove or guard before production".
- **`/api/health` (GET)**: liveness check.
- **Frontend `ContactWidget`**:
  - Floating chat bubble (bottom-right, mounted globally in `layout.tsx`) — opens modal.
  - Hero `Book a Free Consultation` ShimmerButton → dispatches `open-contact-popup` window event.
  - Modal has `idle` / `sending` (spinner + disabled inputs) / `success` (green check + personalized "Thanks, {firstName}") / `error` states.
  - 429 surfaces a friendly rate-limit message inline.
  - Hidden honeypot input mirrors the backend.
- Hydration fix: `book-consultation-btn` test-id moved onto `ShimmerButton` (forwardRef'd `<button>`) — no more nested-button warning.

## Files Touched (new + modified)
**New**
- `/app/backend/server.py`, `/app/backend/.env`, `/app/backend/requirements.txt`
- `/app/frontend/src/components/custom/contactWidget.tsx`
- `/app/frontend/.env`
- `/app/backend/tests/test_contact_api.py` (testing agent)

**Modified**
- `/app/frontend/next.config.mjs` (env exposure)
- `/app/frontend/src/app/layout.tsx` (mount ContactWidget)
- `/app/frontend/src/components/custom/hero.tsx` (CTA → modal)
- `/app/frontend/src/components/custom/serviceCard.tsx` (height + flex)

## Test Status
Iteration 1 (`/app/test_reports/iteration_1.json`): **6/6 backend + 4/4 frontend smoke tests passed.** Resend integration verified live (`email_status=sent`, real `email_id` returned). Hydration warning was MEDIUM — fixed in main agent's follow-up commit (verified clean console).

## Backlog / Future Work
- **DNS verify `pivotsafe.com` on Resend** so emails come from `noreply@pivotsafe.com` instead of the sandbox sender (better deliverability + branding).
- **Guard `/api/contact/_admin/recent`** behind an admin token / env flag, or remove for production.
- **Move rate limiter** from in-process deque to Redis or Mongo TTL collection so it survives restarts and works across replicas.
- **Tighten `_client_ip()`** — currently trusts `X-Forwarded-For` blindly; in a real multi-hop ingress this can be spoofed to bypass rate limits. Use right-most hop or known-proxy whitelist.
- **Set explicit `ALLOWED_ORIGINS`** in production .env (`https://pivotsafe.com,https://www.pivotsafe.com`).
- **Outgoing email aspect-ratio warnings** in Next.js Image — minor cosmetic.
- Real client/partner logos in `/app/frontend/public/clients/` (still placeholders).
- Re-enable Contentful blogs once content is published.
- Optional: lightweight Slack/Discord webhook on lead capture for instant notifications.

## Next Action Items
- Verify `pivotsafe.com` on Resend, then update `RESEND_FROM` to `PivotSafe <noreply@pivotsafe.com>`.
- Drop in real client logos when ready.
- Decide on retention policy for `contact_leads` (e.g., 12-month TTL).
