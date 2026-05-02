# PivotSafe – Website + Contact API PRD

## Original Problem Statement
Fine-tune the Pivot Safe website (Next.js, source shared via zip `pivot-safe-master.zip`), then harden it for production. Applied content/navigation updates, an API-backed contact form with persistence + transactional email, spam protection, brand/logo work, and a full production-readiness pass.

## Architecture / Tech Stack
- **Frontend** (`/app/frontend`): Next.js 15 (App Router), React 19, TS, Tailwind, R3F (three.js). Supervisor `frontend` → port 3000. `yarn start` runs `rm -rf .next && next dev -p 3000 -H 0.0.0.0` to avoid stale-prerender-cache collisions.
- **Backend** (`/app/backend`): FastAPI 0.110, Motor (async MongoDB), Resend 2.29, Pydantic v2, python-dotenv. Supervisor `backend` → port 8001.
- **DB**: local Mongo, db `pivotsafe`, collection `contact_leads` with indexes `idx_lead_id (unique)`, `idx_lead_created_desc`, `idx_ip_created`, `idx_email_status` ensured idempotently in FastAPI `lifespan`.
- **Email**: Resend. Primary sender `PivotSafe <noreply@pivotsafe.com>` (verified domain). Sandbox fallback (`onboarding@resend.dev`) used only when the primary is rejected (e.g. mid-DNS-propagation).
- **Env templates**: `/app/backend/.env.example`, `/app/frontend/.env.example`. Full README at `/app/README.md`.

## User Personas
- Prospective enterprise buyer browsing the marketing site → clicks "Book a Free Consultation" or the floating chat bubble → fills the modal → lead lands in `hello@pivotsafe.com` + Mongo.
- Team admin → polls `GET /api/contact/_admin/recent` with `Authorization: Bearer $ADMIN_TOKEN` for a quick lead digest.

## Implemented

### Website content
Hero CTA, Services (Application Security rename + ICS/SCADA, Embedded & IoT, AI Red Teaming descriptions), Training (Mobile App Hacker's Handbook removed), Recent Blogs hidden, Footer Home → `/`, Adversary-Sim (Embedded & IoT section removed), Real-World Skills modules rewritten to the 6 requested items, Application Security page renames.

### Brand lockup
`BrandLogo` component (gold-accented `⎑` badge + `Pivot`/gold `Safe` wordmark) applied flush-left in the hero, the floating navbar, the footer, and all 14 inner pages. Consistent `px-6 sm:px-10 lg:px-16` horizontal padding site-wide so the mark anchors the top-left corner on every route/width.

### Client logos
Real client PNG/SVG assets dropped in `/app/frontend/public/clients/`: NASA, Comcast, CrowdStrike, Deutsche Telekom, Ferrero, KOHO, Monash, Outbrain, Sezzle, ClickHouse, TrafficJunky. Low-res PNGs (77×75, 110×110) upscaled to 800px via LANCZOS so they render crisp in the marquee. Interactive styling: logos on white chips that lift, scale, and gain a gold ring + sheen sweep on hover.

### Contact form (API-backed)
- **Backend `/api/contact` (POST)**: validates name/email/message via Pydantic v2 + EmailStr, stores the lead in `contact_leads` first, then sends an HTML-escaped transactional email via Resend through `asyncio.to_thread`, then records `email_status`/`email_id`.
- **Honeypot (`website`)**: populated → silent 201 (no DB, no email, rate-limit slot rolled back so bots can't burn the legit bucket for a real user behind the same NAT).
- **Rate limiter**: in-process rolling 1-hour per-IP deque. Default 3/hr. Returns 429 with a friendly `detail`.
- **Frontend `ContactWidget`**: floating bubble + modal mounted globally in `layout.tsx`. States: `idle → sending (spinner) → success / error`. Handles Pydantic v2 validation error arrays (`extractErrorMessage` extracts `msg` per field instead of crashing React). Privacy notice at the bottom of the form.
- Hero "Book a Free Consultation" ShimmerButton dispatches `open-contact-popup` window event (no nested-button hydration warning).

### Production-readiness (latest pass)
- **CORS allowlist** via `ALLOWED_ORIGINS` env (comma-separated). Wildcard only in dev.
- **Admin bearer auth** (`ADMIN_TOKEN`) on `/api/contact/_admin/*`. Fail-closed: when token is unset, the routes return 404.
- **FastAPI docs disabled** in prod (`docs_url=None`, `redoc_url=None`, `openapi_url=None`).
- **DB health** pinged in `/api/health` (returns `status: "degraded"` if Mongo is down).
- **Lead/email resilience**: persistence and email sends are independent try/except. 503 only fires when both fail.
- **HTML escape** applied to every user-controlled field rendered into the outbound email body (no XSS via lead content).
- **User-agent capping** at 500 chars on the stored lead.
- **SEO**: full `Metadata` config (title template, description, OpenGraph, Twitter card, robots, themeColor, canonical) in `layout.tsx`.
- **`/robots.txt`** + dynamic **`/sitemap.xml`** (11 routes, excluding blog detail pages while content is hidden).
- **Contentful null-safe**: `client` is `null` when credentials are missing → service fns short-circuit → `next build` succeeds without env.
- **Env templates** committed (`backend/.env.example`, `frontend/.env.example`) with comments on each variable.
- **Build verification**: `yarn build` passes — 16 routes prerendered (`/sitemap.xml` included).
- **Dev/prod scripts separated**: `yarn start` = clean dev (`rm -rf .next` then `next dev`), `yarn start:prod` = `next build && next start`.
- **README** at `/app/README.md` documents the architecture, env vars, API surface, security guarantees, dev vs prod toggle, and backlog.

## Test Status
- **Iteration 1** (`/app/test_reports/iteration_1.json`): 6/6 backend + 4/4 frontend smoke passed. Resend integration verified live (not mocked).
- **Iteration 2** (`/app/test_reports/iteration_2.json`): 16/16 backend hardening + 3/3 frontend smoke passed. Surfaced the `.next/` stale-prerender-cache bug — fixed in `package.json` so every supervisor restart wipes `.next` before `next dev` boots. Re-verified: bubble is `position: fixed` at bottom-right, modal opens with the privacy notice, and response headers no longer carry `x-nextjs-prerender` / `x-nextjs-cache: HIT`.

## Files Touched

**New**
- `/app/backend/server.py`, `.env`, `.env.example`, `requirements.txt`
- `/app/frontend/src/components/custom/contactWidget.tsx`
- `/app/frontend/src/components/custom/brandLogo.tsx`
- `/app/frontend/src/app/sitemap.ts`
- `/app/frontend/public/robots.txt`
- `/app/frontend/public/clients/*` (real brand assets)
- `/app/frontend/.env`, `.env.example`
- `/app/README.md`, `/app/memory/PRD.md`

**Rewritten / heavily modified**
- `/app/frontend/src/app/layout.tsx` — Metadata + Viewport
- `/app/frontend/src/lib/contentful.ts` — null-safe client
- `/app/frontend/src/lib/blogService.ts` — short-circuit on missing client
- `/app/frontend/src/components/ui/infinite-moving-client-cards.tsx`
- `/app/frontend/src/components/ui/animated-tooltip.tsx`
- `/app/frontend/src/components/custom/aboutUsToolTip.tsx` (names/designations removed)
- `/app/frontend/src/components/custom/trustedClientsMovingCards.tsx`
- `/app/frontend/src/components/custom/hero.tsx` (flush-left logo)
- `/app/frontend/src/components/custom/footerSection.tsx`
- `/app/frontend/src/components/custom/serviceCard.tsx`
- `/app/frontend/src/components/ui/floating-navbar.tsx`
- 14 inner pages (logo lockup + flush-left header)
- `/app/frontend/package.json` — safe dev start script

## Backlog / Future Work
- **P1**: Migrate rate-limit bucket to Redis / Mongo TTL so it survives restarts and scales horizontally.
- **P1**: Rotate `ADMIN_TOKEN` on a schedule (or migrate to per-admin JWTs).
- **P2**: 12-month TTL on `contact_leads` (PII retention policy).
- **P2**: Optional Slack/Discord webhook on each lead for real-time pings.
- **P2**: Re-enable Contentful blog flow when content is published (just set `NEXT_PUBLIC_CONTENTFUL_*` env vars — no code change needed).
- **P3**: Real client logos are already in place; adding a clickable case-study page per logo is a latent SEO/conversion lever.
