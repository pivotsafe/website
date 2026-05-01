# Pivot Safe – Website Fine-Tuning PRD

## Original Problem Statement
Fine-tune the Pivot Safe website (Next.js, source shared via zip `pivot-safe-master.zip`). Apply content/navigation updates listed below without re-designing the site.

## Architecture / Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- TailwindCSS + Framer Motion + @tabler/icons-react + lucide-react
- Contentful blog client (currently unused — blogs are hidden)
- App lives under `/app/frontend` (moved from repo root) to fit supervisor `frontend` program.
  - `package.json` → `start` runs `next dev -p 3000 -H 0.0.0.0` (hot reload enabled, served at port 3000)

## Changes Implemented (Session — Jan 2026)

### Home Page
- **Hero CTA**: Replaced `Get Started` ShimmerButton with `Book a Free Consultation` linking to `mailto:hello@pivotsafe.com?subject=Book%20a%20Free%20Consultation`. `data-testid="book-consultation-btn"`.
- **Services (`serviceCardGroup.tsx`)**:
  - `Software Security` → **`Application Security`** with new description ("Our team delivers in-depth application security assessments…")
  - `ICS/Scada Security` — new description ("…aligned with IEC 62443 and NIST SP 800-82…")
  - `Embedded & IOT Security` — new description ("…standards-aligned embedded and IoT security assessments…")
  - `AI Red Teaming` — new MITRE ATLAS–aligned description
- **Training (`training.tsx`)**: Removed the `Mobile Application Hacker's Handbook, Live Edition` card. Only two remaining cards: Real-World Skills + Adversary Simulation & Red Team Ops.
- **Recent Blogs (`recentBlogs.tsx`)**: Replaced Contentful-fetched post list with a "New blogs coming soon" placeholder block. `data-testid="blogs-coming-soon"`.

### Blogs Index (`/blogs`)
- Replaced full list UI (search/filter/pagination/Contentful fetch) with a "New blogs coming soon" placeholder + "Back to Home" link. Section header + breadcrumb preserved. `data-testid="blogs-page-coming-soon"`.

### Adversary Simulation & Red Team Ops (`/adversary-simulation-red-team-ops`)
- Removed the **Embedded & IoT Security** section entirely.
- Kept Red Team Operations, ICS/SCADA Security, and Why Train with PivotSafe? sections.

### Real-World Skills (`/real-world-skills`)
- Rewrote "Available Training Modules" bullet list to exactly the 6 requested modules:
  1. Network & Infrastructure Penetration Testing
  2. Mobile Application Penetration Testing
  3. Web Application & API Penetration Testing
  4. Active Directory Penetration Testing
  5. Embedded Devices Security Testing
  6. Practical Lab-based Scenarios
- Removed: Privilege escalation & lateral movement, Exploitation chain development, old Web/API and Mobile entries.

### Application Security Page (`/software_security`)
- Page title, breadcrumb label, and `PageTitle` all renamed to **Application Security** (URL path kept unchanged to preserve internal links).

### Footer (`footerSection.tsx`)
- **Home link** now points to `/` (was pointing to `/real-world-skills`). `data-testid="footer-home-link"`.
- "Software Security" label updated to "Application Security" in the Services footer column.

## Files Modified
- `src/app/page.tsx` → unchanged (imports intact)
- `src/components/custom/hero.tsx`
- `src/components/custom/serviceCardGroup.tsx`
- `src/components/custom/training.tsx`
- `src/components/custom/recentBlogs.tsx` (full rewrite)
- `src/components/custom/footerSection.tsx`
- `src/app/adversary-simulation-red-team-ops/page.tsx`
- `src/app/real-world-skills/page.tsx`
- `src/app/software_security/page.tsx`
- `src/app/blogs/page.tsx` (full rewrite)
- `package.json` (scripts → `next dev -p 3000 -H 0.0.0.0`)

## Deferred / Future Work
- **Logos**: placeholders in `trustedClientsMovingCards.tsx` kept as-is — awaiting actual client logos from the user.
- **Book a Free Consultation** currently opens the mail client. Can upgrade to a Calendly/contact-form modal when requested.
- Individual service page descriptions still use the old copy — only the home-page service card descriptions were updated per the brief.
- Contentful blog infrastructure (`blogService`, `contentful.ts`, `blogCard`, `blogList`, etc.) left in the repo but unused; can be re-enabled when blogs are ready to publish.

## Next Action Items
- Drop in the real client/partner logos when provided and wire them into `trustedClientsMovingCards.tsx`.
- Decide on final CTA behaviour (mailto vs. booking integration).
- Re-enable blogs once the team has published posts in Contentful.
