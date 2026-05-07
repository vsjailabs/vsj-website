import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Boxes, Cloud, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/site/CTASection";
import servicesData from "@/content/services.json";
import { site } from "@/lib/site";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  serviceJsonLd,
} from "@/lib/jsonld";

type Pillar = (typeof servicesData.pillars)[number];

const iconMap: Record<string, LucideIcon> = {
  Boxes,
  Sparkles,
  Cloud,
  ShieldCheck,
};

function findPillar(slug: string): Pillar | undefined {
  return servicesData.pillars.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return servicesData.pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = findPillar(slug);
  if (!pillar) return { title: "Service not found" };
  return {
    title: pillar.title,
    description: pillar.summary,
    alternates: { canonical: `${site.url}/services/${pillar.slug}` },
    openGraph: {
      title: `${pillar.title} | ${site.brand}`,
      description: pillar.summary,
      url: `${site.url}/services/${pillar.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = findPillar(slug);
  if (!pillar) notFound();

  const Icon = iconMap[pillar.icon] ?? Boxes;
  const otherPillars = servicesData.pillars.filter((p) => p.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd(pillar))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: pillar.title, href: `/services/${pillar.slug}` },
          ])
        )}
      />

      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-16 pb-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-(--muted) hover:text-(--foreground) mb-6"
          >
            <ArrowLeft size={14} />
            All services
          </Link>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-(--brand-violet)/10 text-(--brand-violet) mb-5">
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
                Service
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
                {pillar.title}
              </h1>
              <p className="mt-5 text-lg text-(--muted) leading-relaxed">
                {pillar.summary}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="/contact">
                  Discuss this engagement
                  <ArrowRight size={16} />
                </Button>
                <Button href="/services" variant="secondary">
                  See all services
                </Button>
              </div>
            </div>

            <aside className="lg:col-span-1 rounded-xl border border-(--border) bg-(--surface-1) p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-(--brand-teal) mb-3">
                At a glance
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-(--muted)">Engagement model</dt>
                  <dd className="font-medium">Fixed-scope or T&amp;M</dd>
                </div>
                <div>
                  <dt className="text-(--muted)">Typical kickoff</dt>
                  <dd className="font-medium">2–3 weeks</dd>
                </div>
                <div>
                  <dt className="text-(--muted)">Team composition</dt>
                  <dd className="font-medium">Architect + 2–6 engineers</dd>
                </div>
                <div>
                  <dt className="text-(--muted)">Industries</dt>
                  <dd className="font-medium">{site.practices.join(" · ")}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-1">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
                What we deliver
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Capabilities
              </h2>
              <p className="mt-3 text-(--muted) leading-relaxed">
                Each engagement is shaped to your stack and risk posture.
                Below is the menu we draw from.
              </p>
            </div>
            <div className="lg:col-span-2">
              <ul className="grid sm:grid-cols-2 gap-3">
                {pillar.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex gap-3 rounded-lg border border-(--border) bg-(--surface-1) px-4 py-3 text-sm"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-y border-(--border) bg-(--surface-2)">
        <Container>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
            Other practices
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            Pair this with
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherPillars.map((p) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="rounded-lg border border-(--border) bg-(--surface-1) p-5 hover:border-(--brand-violet)/40 transition-colors"
              >
                <div className="text-sm font-semibold tracking-tight">
                  {p.title}
                </div>
                <div className="mt-1 text-xs text-(--muted) line-clamp-2">
                  {p.tagline}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
