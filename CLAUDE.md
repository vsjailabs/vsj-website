@AGENTS.md

# VSJ AI Labs Website

Marketing site for VSJ AI Labs Pvt. Ltd. — see README.md for full setup.

## Stack
Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · lucide-react · Geist fonts.

## Quick commands
- `npm run dev` — dev server runs on **port 3017** (kept free for this project)
- `npx next build` — run after every structural change; catches type errors faster than dev-server runtime
- `curl -sI http://localhost:3017/` — verify security headers fire
- `curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3017/<path>` — fast route smoke test

## Single sources of truth
- **Site facts** (legal name, CIN, GSTIN, contact, tagline) — `src/lib/site.ts`
- **Brand tokens** (navy/cream/teal/violet/cyan) — `src/app/globals.css` `:root` block, exposed to Tailwind via `@theme inline`
- **Editable copy** — `src/content/*.json` (services, industries, industry-details, faq, team, case-studies, trust)
- **Structured data** — `src/lib/jsonld.ts`
- **Security headers** — `next.config.ts` `headers()` async function

## Brand spec (canonical)
Source-of-truth: `~/OwnCompany/Company Docs/Company Banner/generate_banners.py` (v4.7).
- Tagline: **"Wisdom Served Sweet."** (NOT "Wisdom Peace Sweetnerss" from older hoarding PDF)
- Promise: "Compliance-first AI for regulated industries."
- Practices: BFSI · Healthcare · Enterprise SaaS
- Logos: `public/brand/logo-on-{black,white}.png` (PNG includes wordmark — blurry under 48px height)

## Tailwind v4 conventions used here
- No `tailwind.config.ts` — theme defined in `globals.css` via `@theme inline { --color-foo: var(--bar) }`
- Reference brand vars in JSX as `text-(--brand-violet)`, `bg-(--brand-navy)/10`, etc.
- `prose-legal` is a custom class for legal pages (not @tailwindcss/typography)

## Content authoring
- JSON entries with `"placeholder": true` are scaffolded for replacement before launch
- `[BRACKETED]` text in legal pages = placeholder needing real legal copy
- To add a service: edit `src/content/services.json`; the `/services/[slug]` route is generated automatically via `generateStaticParams`

## Known gotchas
- `lucide-react` does NOT export brand icons (Linkedin, Github, etc.) — inline SVG instead. Bug surfaces only at `next build`, not type-check.
- Next.js 16 typed routes narrow `pathname` from `usePathname()`. Comparing to a literal `"/"` against a `nav[]` containing only non-`/` routes is a "no overlap" type error. Use `pathname.startsWith(`${item.href}/`)` instead.
- npm package names reject capitals/spaces — scaffold into a kebab-case subdir, then move files.
- CSP is currently `Content-Security-Policy-Report-Only`. Promote to enforced in `next.config.ts` after monitoring violations.
- Cookie consent state is stored at `localStorage["vsj-cookie-consent-v1"]` and dispatches `window` event `vsj:consent`. Gate any new analytics scripts on this event before loading.
- Contact form uses honeypot field `website` (must stay empty) and dwell-time guard `_t` (form-render epoch ms; submissions <2s rejected silently).

## Per AGENTS.md (still binding)
Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` — APIs may differ from training data. This rule has paid off twice in the current branch.
