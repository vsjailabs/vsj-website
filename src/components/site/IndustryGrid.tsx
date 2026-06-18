import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import industriesData from "@/content/industries.json";

export function IndustryGrid() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Domain depth, not just code."
          description="We bring patterns and integrations from working across regulated and growth industries — so we don't learn your business on your dime."
          align="center"
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-(--border) bg-(--border) md:grid-cols-3">
          {industriesData.industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group bg-(--surface-1) p-7 transition-colors hover:bg-(--surface-2)"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text)">
                {ind.slug.replace(/-/g, " ")}
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight flex items-start justify-between gap-3">
                <span>{ind.title}</span>
                <ArrowUpRight
                  size={16}
                  className="text-(--muted) group-hover:text-(--brand-violet) transition-colors shrink-0 mt-0.5"
                />
              </h3>
              <p className="mt-2 text-sm text-(--muted) leading-relaxed">
                {ind.blurb}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
