import { Container } from "@/components/ui/Container";
import trust from "@/content/trust.json";

/**
 * Logo strip — shown above the fold to anchor credibility.
 *
 * Currently rendering placeholder cells. To replace:
 * 1. Drop client logos into /public/brand/clients/<slug>.svg (preferably SVG)
 * 2. Update src/content/trust.json clients[] entries:
 *    { "name": "Acme", "src": "/brand/clients/acme.svg", "placeholder": false }
 * 3. Each logo is rendered grayscale with hover-to-color treatment.
 */
export function TrustStrip() {
  return (
    <section
      aria-label="Clients and partners"
      className="py-12 border-b border-(--border)"
    >
      <Container>
        <div className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-(--muted) mb-6">
          Building with teams across BFSI · Healthcare · Enterprise SaaS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-4 items-center">
          {trust.clients.map((c) => (
            <div
              key={c.name}
              className="h-10 sm:h-12 rounded-md border border-dashed border-(--border) bg-(--surface-2)/50 grid place-items-center text-[10px] uppercase tracking-wider text-(--muted)"
            >
              {c.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
