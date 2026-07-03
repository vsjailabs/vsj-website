---
description: Generate or edit a VSJ-branded PPTX deck using pptxgenjs. Encodes the palette, fonts, logo assets, and layout patterns proven in the 2026-07-03 marketing plan deck.
---

Build a professional PowerPoint deck in VSJ AI Labs branding, or apply surgical text edits to an existing VSJ deck. Follow the pptx skill (`anthropic-skills:pptx`) for the tooling — this command locks in the VSJ-specific parts.

## Workspace + dependencies

Use the scratchpad directory as the workspace. Scratchpad gets cleared between turns, so if resuming a deck, copy the delivered `.pptx` from `~/Downloads/` back to the workspace first.

```sh
SCRATCH="/private/tmp/claude-502/-Users-tpe-VSJWORK-vsj-website/c15d10c0-d28b-498d-a6b5-629354c61c92/scratchpad/vsj-deck"
mkdir -p "$SCRATCH" && cd "$SCRATCH"
npm install --silent pptxgenjs react-icons react react-dom sharp
```

For text-only surgical edits (single-word / number changes on an existing deck), skip pptxgenjs and use `python-pptx` for a much faster path:

```sh
python3 -m venv .venv
.venv/bin/pip install --quiet python-pptx
# then use .venv/bin/python to run a small script that opens, edits runs, and saves
```

## VSJ brand palette

Store as JS constants inside the pptxgenjs generator. All hex strings must be 6 chars, no `#` prefix.

```javascript
const C = {
  navy:      "0E2A47", navy2: "1A3859", lightBg: "FAFAF7", cardBg: "FFFFFF",
  violet:    "7C5CFF", violet2: "6B46E0", teal: "0F766E", cyan: "38BDF8",
  orange:    "EA880C", danger: "DC2626", success: "10B981",
  ink:       "0F1729", muted: "595F6B", mutedDark: "9BAECF",
  divider:   "E5E7EB",
};
```

**Dominance rule:** navy on cover + closing (60-70% weight there), light neutral `FAFAF7` on content slides, violet as the sharp accent, teal as secondary. Never five-way colour equality.

## Fonts

Calibri throughout — safe list, renders same width in LibreOffice QA as it will in PowerPoint. Cambria for large numeric callouts and phase-badge numbers (e.g., `01`, `02`, `03`). Never use Aptos.

## Layout + motif

- `pres.layout = "LAYOUT_WIDE"` — 13.333" × 7.5" (extra real estate)
- Phase badges: violet solid `OVAL` at right edge with Cambria number inside
- Section eyebrows: 11pt bold violet, `charSpacing: 6`, e.g. `01  ·  STRATEGIC THESIS`
- Cards: `ROUNDED_RECTANGLE` with `rectRadius: 0.08–0.1`, subtle shadow (see below)
- Footer bar: navy 0.55"-tall rectangle at y ≈ 6.55 for end-of-phase targets

**Never** add accent stripes, edge bars, or thin colour strips — flagged as AI-slop by the pptx skill.

## Shadow (fresh object each call — pptxgenjs mutates in place)

```javascript
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.08,
});
```

## Logo assets

See [[project_vsj_website]] for the full inventory. On dark backgrounds (navy cover + closing), use the colour mark with the black background stripped:

```javascript
// Copy the source PNG first
cp ~/VSJWORK/vsj-website/public/brand/logo-on-black.png <workspace>/logo-mark-dark.png

// Programmatically strip black -> transparent (Python)
python3 <<'PY'
from PIL import Image
im = Image.open("logo-mark-dark.png").convert("RGBA")
w, h = im.size
px = im.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if r + g + b < 40:
            px[x, y] = (r, g, b, min(255, (r + g + b) * 6))
im.save("logo-mark-transparent.png")
PY
```

Place at ~1.0" × 1.0" top-left corner: `slide.addImage({ path: "logo-mark-transparent.png", x: 0.5, y: 0.4, w: 1.0, h: 1.0 })`. Do NOT use `logo-horizontal-dark.png` on the deck cover — it is a monochrome white variant designed for the website header, not the branded gradient.

## Attribution defaults

- Author: `Ashish Kumar Satyam` (this project's primary user, VSJ CTO)
- Company: `VSJ AI Labs Pvt. Ltd.`
- Cover subtitle format: `"90-day <descriptor> go-to-market for compliance-first AI in regulated industries"`
- Never reference TechDigital WishTree per user's global CLAUDE.md rule
- If a plan involves marketing execution, reference Nikita Tomer for ownership — see [[project_vsj_team]]

## Rendering + QA (macOS)

LibreOffice lives at a non-standard path — the system `soffice` isn't on PATH. Use:

```sh
SOFFICE="/Users/aksatyam/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/soffice"
mkdir -p "$SCRATCH/.lo-profile"

# rezip after pptxgenjs writes (compression: true is a no-op)
python3 "$SKILL/scripts/rezip.py" my-deck.pptx

# render to PDF then JPEGs
"$SOFFICE" --headless -env:UserInstallation="file://$SCRATCH/.lo-profile" \
  --convert-to pdf my-deck.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 110 my-deck.pdf slide
```

The private `UserInstallation` profile is required because the shared LibreOffice cache is owned by uid 501 (aksatyam) while Claude runs as uid 502 (tpe) — see the global CLAUDE.md and `cross-user-ops` skill.

## Delivery

Copy both `.pptx` and `.pdf` to `~/Downloads/` — user convention. Then `open ~/Downloads/<name>.pptx` to launch in PowerPoint/Keynote.

## Reference deliverable

The 14-slide *VSJ AI Labs — 90-Day Digital Marketing Plan* is the canonical pattern. See [[project_vsj_marketing]] for the strategy content it encodes.
