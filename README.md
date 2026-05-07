# VSJ AI Labs — Website

Marketing site for **VSJ AI Labs Pvt. Ltd.** built on Next.js 16 (App Router) + Tailwind v4 + TypeScript.

> Tagline: *Wisdom Served Sweet.* — Compliance-first AI for regulated industries.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static-first, fast TTFB, modern conventions |
| Language | TypeScript | Type-safe content + routing |
| Styling | Tailwind v4 (CSS-variable theming) | No JS config; dark-mode aware |
| Icons | lucide-react | Tree-shakable named imports |
| Content | JSON files in `src/content/` | Editable without touching components |
| Email | Resend (via `/api/contact`) | Wired but unconfigured — needs `RESEND_API_KEY` |
| Analytics | None (consent-gated when added) | DPDPA / GDPR-compliant by default |

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (all routes prerendered)
npm run start        # production preview
```

## Project layout

```
src/
├── app/                       # routes (App Router)
│   ├── layout.tsx              # root layout — JSON-LD, header, footer, cookie banner
│   ├── page.tsx                # home
│   ├── services/
│   │   ├── page.tsx            # services index
│   │   └── [slug]/page.tsx     # per-service detail (statically generated)
│   ├── industries/
│   │   ├── page.tsx            # industries index
│   │   └── [slug]/page.tsx     # per-industry detail
│   ├── case-studies/page.tsx
│   ├── team/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── legal/                  # privacy / terms / cookies
│   ├── api/contact/route.ts    # form submission handler (validation + honeypot)
│   ├── opengraph-image.tsx     # dynamic OG image (1200×630)
│   ├── icon.tsx / apple-icon.tsx
│   ├── manifest.ts             # PWA manifest
│   ├── robots.ts / sitemap.ts
│   ├── error.tsx / loading.tsx / not-found.tsx
│   └── globals.css             # brand tokens
├── components/
│   ├── ui/                     # primitives (Button, Container, SectionHeading)
│   └── site/                   # composed sections (Hero, ServicePillars, Process, FAQ, etc.)
├── content/                    # JSON content — edit these
│   ├── services.json
│   ├── industries.json
│   ├── industry-details.json
│   ├── faq.json
│   ├── team.json
│   ├── case-studies.json
│   └── trust.json
└── lib/
    ├── site.ts                 # legal name, contact, CIN, GSTIN
    ├── jsonld.ts               # structured data helpers
    └── utils.ts                # cn() class merger
```

## Brand tokens

Defined in `src/app/globals.css` as CSS variables, exposed to Tailwind via `@theme inline`.

| Variable | Hex | Usage |
|---|---|---|
| `--brand-navy` | `#0e2a47` | Primary, dark surfaces |
| `--brand-cream` | `#faf8f1` | Light surface |
| `--brand-teal` | `#14b8a6` | Eyebrows, accents |
| `--brand-orange` | `#ea880c` | Highlight, in-progress |
| `--brand-violet` | `#7c5cff` | Logo gradient start |
| `--brand-cyan` | `#38bdf8` | Logo gradient end |

Use as `text-(--brand-violet)`, `bg-(--brand-navy)`, etc.

## Content TODOs (before launch)

These files contain `placeholder` flags or `[BRACKETED]` text that must be replaced:

- [ ] `src/content/services.json` — pillar summaries, capability lists
- [ ] `src/content/industry-details.json` — per-industry headlines, use cases
- [ ] `src/content/team.json` — leadership bios + LinkedIn URLs + photos
- [ ] `src/content/case-studies.json` — three real case studies with metrics
- [ ] `src/content/trust.json` — client logos (drop in `public/brand/clients/`), real testimonials, certification statuses
- [ ] `src/app/legal/privacy/page.tsx` — fill `[PLACEHOLDER]` blocks (processors, retention, grievance officer)
- [ ] `src/app/legal/terms/page.tsx` — fill `[PLACEHOLDER]` blocks (jurisdiction, liability cap)

## Deployment

### Vercel (recommended)
```bash
npx vercel
```
Set the environment variables from `.env.example` in the Vercel project settings.

### Self-hosted
The site is fully static for non-API routes. Run `npm run build` and serve `.next/`.

## Security posture

- Strict-Transport-Security with `preload` (set on production domain)
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Permissions-Policy` disables camera, microphone, geolocation, payment, etc.
- CSP starts in **report-only** mode — promote to enforced after monitoring
- `poweredByHeader: false` (no Next.js fingerprint)
- Form: honeypot field + dwell-time guard against bots; payload validation in API route

## Accessibility

- Skip-to-content link
- Semantic landmarks (`<main id="main-content">`, `<nav>`, `<footer>`)
- Form fields have `aria-invalid` / `aria-describedby` on errors
- Focus-visible rings on interactive elements
- Color contrast targeted at WCAG 2.1 AA

## Analytics & monitoring

Both intentionally unconfigured. When you add them:
- Plausible → drop the script in `src/app/layout.tsx` gated on the cookie consent state
- Sentry → run `npx @sentry/wizard@latest -i nextjs`

## License

Proprietary. © VSJ AI Labs Pvt. Ltd.
