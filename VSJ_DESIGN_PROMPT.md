# VSJ AI Labs — Website Design Prompt for Claude Design

Use this prompt in Claude (claude.ai) with the "Create a design" or artifact feature to reproduce the VSJ AI Labs marketing website design.

---

## Prompt

Design a modern, enterprise-grade marketing website for **VSJ AI Labs Pvt. Ltd.**, an Indian IT services company that builds compliance-first AI, custom software, and cloud platforms for BFSI (banking/insurance), healthcare, and enterprise SaaS clients.

### Brand Identity

- **Company:** VSJ AI Labs Pvt. Ltd.
- **Tagline:** "Wisdom Served Sweet."
- **Promise:** "Compliance-first AI for regulated industries."
- **Practices:** BFSI · Healthcare · Enterprise SaaS
- **Domain:** vsjailabs.com
- **Tone:** Professional, trustworthy, technically credible. Not flashy startup — think "serious engineering firm that banks would trust."

### Color Palette

**Light mode:**
| Token | Hex | Usage |
|-------|-----|-------|
| Navy (primary) | `#0e2a47` | Headings, CTA panels, hero text |
| Cream | `#faf8f1` | Alternate section backgrounds |
| Violet | `#7c5cff` | Primary accent, icon backgrounds, links |
| Cyan | `#38bdf8` | Secondary accent, gradient endpoint |
| Teal | `#14b8a6` | Eyebrow labels, bullet dots, separators |
| Blue | `#3b9ae5` | Gradient midpoint |
| Orange | `#ea880c` | Warnings, highlights |
| Foreground | `#0f1729` | Body text |
| Muted | `#6b7280` | Secondary text, descriptions |
| Surface-1 | `#ffffff` | Card backgrounds |
| Surface-2 | `#faf8f1` | Elevated backgrounds (cream) |
| Border | `#e6e0cf` | All borders, dividers |

**Dark mode:**
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#07101f` | Page background |
| Foreground | `#e9eef7` | Body text |
| Surface-1 | `#0b1a2c` | Card backgrounds |
| Surface-2 | `#0e2a47` | Elevated backgrounds |
| Border | `#1e3252` | Borders |
| Muted | `#94a3b8` | Secondary text |

**Brand gradient:** `linear-gradient(90deg, #7c5cff → #38bdf8)` — used for headline text gradient, CTA button backgrounds, and decorative blobs.

### Typography

- **Sans:** Geist Sans (or Inter as fallback)
- **Mono:** Geist Mono (for CIN/GSTIN, code snippets)
- **H1:** 3.75rem (60px), semibold, tracking-tight, text-balance
- **H2:** 2.25rem–2.5rem (36–40px), semibold, tracking-tight
- **H3:** 1.125rem (18px), semibold
- **Body:** 1rem (16px), regular
- **Eyebrow labels:** 0.75rem (12px), semibold, uppercase, letter-spacing 0.18em, teal color
- **Muted body:** Gray `#6b7280`, relaxed line-height

### Layout System

- **Max width:** 1152px (max-w-6xl)
- **Padding:** 20px mobile, 24px tablet, 32px desktop
- **Section spacing:** `py-24` to `py-28` (96–112px vertical padding)
- **Grid:** 1 col mobile → 2 col tablet → 4 col desktop for cards
- **Border radius:** `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons/inputs, `rounded-2xl` (16px) for CTA panels

### Logo

- **Horizontal wordmark:** Triangle/spiral symbol (purple-to-cyan gradient) + "VSJ AI LABS" text beside it. Used in header (44px height) and footer (56px height).
- **Stacked version:** Symbol above text, square aspect ratio. Used for favicons and social cards.
- **Favicon:** Letter "V" on violet→cyan gradient at 32px.

### Component Design Patterns

#### Sticky Header
- Height: 64px (h-16)
- Frosted glass: `bg-white/85 backdrop-blur` with border-bottom
- Logo left, nav links center, "Talk to us" CTA button right
- Nav items: 14px, medium weight, rounded-md padding, active state uses cream background
- Mobile: hamburger menu with slide-down nav

#### Hero Section
- Full-width with subtle grid pattern overlay (56px grid, 6% opacity foreground lines)
- Radial gradient blobs (violet 28% + cyan 22%) fading from top
- Pill badge: rounded-full, bordered, with Sparkles icon + promise text
- H1 with gradient text on key phrase ("AI engineered" in violet→cyan gradient text)
- Two CTA buttons: primary (gradient) + secondary (outlined)
- Practice tags row: "BFSI · Healthcare · Enterprise SaaS" with teal dot separators

#### Section Heading Pattern
- Teal eyebrow text (uppercase, tracking-wide)
- H2 title
- Optional muted description paragraph
- Max-width 768px (max-w-3xl)

#### Service Cards (4-column grid)
- White card with border, rounded-xl
- Violet icon in a 44px rounded-lg box with 10% violet background
- Title, tagline, capability bullet list (teal dots)
- "Learn more" link with violet text + ArrowUpRight icon
- Hover: shadow-lg with violet/10 tint

#### Stats Bar
- Cream background (`#faf8f1`) section with top/bottom borders
- 4-column grid of stat values
- Values use brand gradient text (`text-gradient-brand`)
- Labels in muted gray

#### Process Timeline (4 steps)
- Cream background section
- Cards with step number in mono teal font (01, 02, 03, 04)
- Icon + title + duration + description
- "Outputs" section below a border divider, with tiny teal eyebrow and bullet list

#### CTA Panel
- Navy (`#0e2a47`) rounded-2xl card
- Decorative gradient blobs (violet/40 and teal/25) with blur
- Subtle grid pattern at 7% opacity
- White text, cyan eyebrow
- White solid button + ghost white button

#### Contact Form (single column layout)
- Centered at max-w-3xl
- Form card: bordered, rounded-xl, white background, 24-32px padding
- 2-column fields (Name/Email, Company/Phone), full-width Subject and Message
- Violet focus ring on inputs
- Gradient "Send message" button
- Info cards below in 2×2 grid (Email, Phone, Schedule, Address)

#### Footer
- Cream background with top border
- 6-column grid: Logo + description + address (2 cols), Services, Industries, Company, Legal
- CIN/GSTIN in 11px monospace
- Social links (LinkedIn, GitHub, X) right-aligned in bottom bar

### Decorative Elements

1. **Grid pattern:** 56px CSS grid lines at 6% foreground opacity, masked with radial gradient
2. **Radial fade:** Dual radial gradients — violet (28%) from top-center, cyan (22%) from right
3. **Brand gradient text:** `background-clip: text` with violet→cyan gradient
4. **CTA blobs:** Large (400–450px) blurred gradient circles positioned behind content
5. **Teal dot separators:** Small `·` characters in teal between items

### Page Structure (Homepage)

1. **Hero** — Tagline, H1 with gradient text, CTAs, practice tags
2. **Trust Strip** — "Building with teams across BFSI · Healthcare · Enterprise SaaS" + 6 client logo placeholders (rounded pills)
3. **Stats Bar** — 4 metrics on cream background (Founded date, 3 practices, AI-first, Compliance-led)
4. **Service Pillars** — "Four pillars. One delivery team." + 4 service cards
5. **Process** — "A four-stage engagement model." + 4 step cards (Discover, Design, Build, Operate)
6. **Emerging Tech** — Pill tags for AI, ML, Data Analytics, Blockchain, IoT, Edge Computing
7. **Industry Grid** — 3 industry cards (BFSI, Healthcare, Enterprise SaaS)
8. **Testimonials** — 3 testimonial cards (placeholder)
9. **Certifications** — MSME, Startup India, ISO 27001, SOC 2, NASSCOM, DPDPA badges
10. **FAQ** — 7 expandable accordion items
11. **CTA Section** — Navy panel with gradient blobs
12. **Footer** — Full navigation + legal + address

### Key Design Principles

- **No emoji in UI** — use Lucide icons only
- **Enterprise credibility** — clean borders, subtle shadows, professional typography
- **Accessibility** — skip link, ARIA labels, focus rings, semantic HTML
- **Responsive** — mobile-first, all grids collapse gracefully
- **Dark mode** — auto via `prefers-color-scheme`, navy replaces cream surfaces
