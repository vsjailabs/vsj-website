---
description: Quick digital-marketing audit sweep of the live vsjailabs.com — metadata, structured data, placeholder scan, headers, timings.
---

Run a rapid audit of the production site — the same eight-track pass documented in the marketing-audit backlog, distilled to what can be measured from outside in one pass.

Steps (batch what you can):

1. Crawl all 21 routes in parallel and cache HTML locally:
   - `/`, `/services`, `/services/{custom-software,ai-ml-data,cloud-devops,cybersecurity}`
   - `/industries`, `/industries/{bfsi,healthcare,enterprise-saas}`
   - `/about`, `/team`, `/case-studies`, `/contact`, `/security`
   - `/legal/{privacy,terms,cookies}`
   - `/sitemap.xml`, `/robots.txt`, `/llms.txt`

2. For each rendered HTML route, extract and report:
   - Title + length (target 30–60c)
   - Meta description + length (target 120–160c, hard ceiling 172c)
   - H1 count (must be exactly 1)
   - JSON-LD `@type`s present (Organization + WebSite are minimum; expect BreadcrumbList on subpages, Service on /services/*, ItemList on /team, FAQPage on home)
   - Placeholder-token count matching regex `Client name|CLIENT LOGO|class="placeholder"|\[Replace|\[LIST|\[CONFIRM|\[NAME|\[INR|\[CITY` — target 0.

3. Response headers on `/`:
   - Content-Security-Policy present and enforced (not report-only)
   - HSTS with `preload`
   - X-Frame-Options `DENY`
   - Permissions-Policy configured
   - `x-nextjs-cache: HIT` (ISR working)
   - **No duplicated headers.** Each security header should appear exactly once. Duplicates indicate that Nginx is adding `add_header` directives on top of Next.js's own — the Nginx values are usually weaker (shorter HSTS, fewer Permissions-Policy features) and browsers can pick either. If any header appears twice, flag it and see [[project_vsj_deploy]] "add_header trap" for the fix — remove them from `/etc/nginx/sites-available/vsjailabs.com` on the box, not from `next.config.ts`.

4. Home page 5-run TTFB + total-time sample (median target ≤300ms TTFB, ≤700ms total).

5. Sitemap URL count (currently 18, add /security if missing).

6. Robots.txt should reference the sitemap.

Reference the current audit backlog state at [[project_launch_checklist]] and the audit playbook at [[project_vsj_website]]. Cross-reference known-blocked items (Poonam LinkedIn, real testimonials, etc.) before flagging as fresh findings.

**Output shape:** three-section report — Green (all clear), Yellow (needs attention but not urgent), Red (visible on the live site). One-sentence remediation per Yellow/Red.

If you'd like a deeper look at any red item, offer to run the appropriate follow-up (contact-form health via /contact-health, deploy fixes via /deploy).
