---
description: External + server-side security audit of vsjailabs.com — TLS, headers, secret-leak paths, API surface, rate limiting, container hardening, npm audit. Complements /audit (which is marketing/SEO-focused).
---

Run a full security posture check of the live site and the Hostinger box behind it. Categorises findings by severity (Red / Yellow / Green) with a concrete remediation for anything not Green.

Reference [[project_vsj_security]] for the verified-controls list + accepted-risks list before flagging anything as fresh. If a finding matches an accepted risk (postcss transitive, CSP `unsafe-inline`), note it as accepted, not new.

## Categories to test (batch what you can)

### External (from anywhere with curl + openssl)

1. **TLS versions** — use `-min_protocol / -max_protocol` bounds, NOT `-tlsN` (that allows fallback and gives false positives). Confirm 1.0 + 1.1 rejected, 1.2 + 1.3 accepted.
2. **Certificate** — issuer, SAN coverage, expiry ≥ 30 days out.
3. **HTTP → HTTPS** — 301 on both apex and www.
4. **Security headers** — each of `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy` should appear **exactly once**. Duplicates indicate the Nginx `add_header` trap has recurred — see [[project_vsj_deploy]] for the fix path.
5. **`X-Powered-By` and `Server:` disclosure** — no version numbers.
6. **CSP text** — should NOT be report-only. `unsafe-inline` and `unsafe-eval` in `script-src` are an accepted risk (Next.js App Router requirement). `object-src 'none'` and `frame-ancestors 'none'` should be present.
7. **Secret-leak paths** — `/.env` `/.env.local` `/.env.production` `/.git/config` `/.git/HEAD` `/.git/index` `/.DS_Store` `/admin/` `/wp-admin/` `/.htaccess` `/web.config` `/phpinfo.php` `/package.json` `/Dockerfile` — all must 404 or 308→404.
8. **`/api/contact` endpoint sanity** — GET → 405, empty POST → 422 with clean error JSON (no stack trace), invalid JSON → 400.
9. **Rate limiting on `/api/contact`** — 10 rapid POSTs from the same IP. Should see 503 appear by attempt 7 (Nginx `limit_req contact_zone burst=5`).
10. **CORS** — OPTIONS with cross-origin request should return NO `Access-Control-*` headers.

### Server-side (via ssh utho — key `~/.ssh/id_github_vsjailabs`)

11. **`.env.production` perms** — must be `0600`. If `0644` again, treat as an incident.
12. **Stale env backups** — flag any `.env.production.bak-*` older than 7 days.
13. **Nginx `add_header` count** on the marketing vhost — target 0.
14. **`server_tokens off;`** in `/etc/nginx/nginx.conf` http block.
15. **`limit_req_zone contact_zone`** in `/etc/nginx/nginx.conf` http block.
16. **Externally-exposed ports** — should be 22, 80, 443 only. All Docker containers on `127.0.0.1`.
17. **`vsj-website` container user** — must be `node` (uid 1000), not root.
18. **Running Next.js version** — `docker exec vsj-website node -e 'console.log(require("next/package.json").version)'`.
19. **npm audit inside the container** — `docker exec vsj-website npm audit --omit=dev --json`. Target 0 critical, 0 high. Two moderates (both postcss transitive) are accepted.

### Marketing site smoke test

20. Spot-check `/`, `/services`, `/team`, `/contact`, `/security`, `/legal/privacy` — all 200.

## Output shape

Three-section report: Red (critical/high, fix now) · Yellow (medium, fix this week) · Green (verified good). One-sentence remediation per Red/Yellow. Anything matching [[project_vsj_security]]'s accepted-risks list gets its own **Accepted** section — don't count those as new findings.

## Follow-ups

If any Red/Yellow lands, offer to execute the fixes:
- Nginx recurrence → strip `add_header` directives + reload
- `.env.production` perm regression → chmod 600
- Missing rate limit → re-add `limit_req_zone` + `location = /api/contact` block
- New Next.js CVE → `npm install next@<patched>` + rsync + rebuild container
- Any config change → back up first (`cp $FILE ${FILE}.bak-YYYY-MM-DD`), then `nginx -t` before `systemctl reload`.

Never modify `next.config.ts` to remove headers just because Nginx duplicates them — always strip the Nginx copies instead. Next.js is the single source of truth for HTTP security headers on this site.
