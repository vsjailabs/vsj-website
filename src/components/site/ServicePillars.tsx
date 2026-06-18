import Link from "next/link";
import { Boxes, Sparkles, Cloud, ShieldCheck, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import servicesData from "@/content/services.json";

const iconMap: Record<string, LucideIcon> = {
  Boxes,
  Sparkles,
  Cloud,
  ShieldCheck,
};

export function ServicePillars({
  withLinks = true,
}: {
  withLinks?: boolean;
}) {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Four pillars. One delivery team."
          description="We package the breadth of an IT services firm into focused practices — so you get specialists without losing accountability."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] ?? Boxes;
            return (
              <article
                key={pillar.slug}
                id={pillar.slug}
                className="group relative flex flex-col rounded-xl border border-(--border) bg-(--surface-1) p-6 transition-shadow hover:shadow-lg hover:shadow-(--brand-violet)/10"
              >
                <div className="grid place-items-center w-11 h-11 rounded-lg bg-(--brand-violet)/10 text-(--brand-violet)">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-(--muted) leading-relaxed">
                  {pillar.tagline}
                </p>
                <ul className="mt-5 space-y-1.5 text-sm">
                  {pillar.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className="flex gap-2 text-(--foreground)/85">
                      <span className="mt-2 h-1 w-1 rounded-full bg-(--brand-teal)" />
                      {c}
                    </li>
                  ))}
                </ul>
                {withLinks && (
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-(--brand-violet-2) hover:text-(--brand-violet)"
                  >
                    Explore {pillar.title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
