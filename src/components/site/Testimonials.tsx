import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import trust from "@/content/trust.json";

export function Testimonials() {
  return (
    <section className="py-24 sm:py-28 border-y border-(--border) bg-(--surface-2)">
      <Container>
        <SectionHeading
          eyebrow="What clients say"
          title="Outcomes, in their words."
          description="When you have wins, place them here. Specific metrics > generic praise."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trust.testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-xl border border-(--border) bg-(--surface-1) p-6"
            >
              <Quote
                size={20}
                className="text-(--brand-violet)/60"
                aria-hidden
              />
              <blockquote className="mt-4 text-sm sm:text-[15px] leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-(--border)">
                <div className="text-sm font-medium">{t.author}</div>
                <div className="text-xs text-(--muted)">{t.company}</div>
                {t.placeholder && (
                  <div className="mt-2 text-[10px] uppercase tracking-wider text-(--brand-orange) font-semibold">
                    Placeholder · replace before launch
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
