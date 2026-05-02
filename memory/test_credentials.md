# PivotSafe — Test Credentials

## Backend admin API

`ADMIN_TOKEN` gates `GET /api/contact/_admin/*`. The token is stored in
`/app/backend/.env` (key: `ADMIN_TOKEN`). Read it dynamically — do not
hardcode in code or tests:

```bash
TOKEN=$(grep ADMIN_TOKEN /app/backend/.env | cut -d'=' -f2)
curl -H "Authorization: Bearer $TOKEN" https://<host>/api/contact/_admin/recent
```

Current value (preview env): `ps_admin_5bd35ac50fc67ce700b80ef179416b78` (rotated)

> Rotate before shipping to production. Generate a new one with:
> `python -c "import secrets; print('ps_admin_' + secrets.token_hex(16))"`
> Then update `/app/backend/.env` and `sudo supervisorctl restart backend`.

## Resend (transactional email)

- `RESEND_API_KEY` in `/app/backend/.env` (starts with `re_…`).
- Primary sender: `PivotSafe <noreply@pivotsafe.com>` (verified domain).
- Fallback sender: `onboarding@resend.dev` (used automatically if the primary is rejected).
- Recipient (`CONTACT_TO`): `hello@pivotsafe.com`.

## MongoDB

- URL: `mongodb://localhost:27017` (no auth in dev — local only).
- DB: `pivotsafe`. Collection: `contact_leads` (indexed on `id` unique,
  `created_at` desc, `(ip, created_at)`, `email_status`).

## No user-facing auth

The marketing site has no public login / registration. Contact-form
submissions are the only user-written surface and are rate-limited per IP
(default 3/hour).
