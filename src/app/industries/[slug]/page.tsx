import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/site/CTASection";
import industriesData from "@/content/industries.json";
import industryDetails from "@/content/industry-details.json";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

type Industry = (typeof industriesData.industries)[number];
type Detail = (typeof industryDetails.details)[keyof typeof industryDetails.details];

function findIndustry(slug: string): { ind: Industry; detail: Detail } | undefined {
  const ind = industriesData.industries.find((i) => i.slug === slug);
  const detail = (industryDetails.details as Record<string, Detail>)[slug];
  if (!ind || !detail) return undefined;
  return { ind, detail };
}

export function generateStaticParams() {
  return industriesData.industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findIndustry(slug);
  if (!found) return { title: "Industry not found" };
  return {
    title: found.ind.title,
    description: found.detail.intro,
    alternates: { canonical: `${site.url}/industries/${found.ind.slug}` },
    openGraph: {
      title: `${found.ind.title} | ${site.brand}`,
      description: found.detail.intro,
      url: `${site.url}/industries/${found.ind.slug}`,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findIndustry(slug);
  if (!found) notFound();

  const { ind, detail } = found;
  const others = industriesData.industries.filter((i) => i.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Industries", href: "/industries" },
            { name: ind.title, href: `/industries/${ind.slug}` },
          ])
        )}
      />

      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-16 pb-16">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-sm text-(--muted) hover:text-(--foreground) mb-6"
          >
            <ArrowLeft size={14} />
            All industries
          </Link>

          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              {ind.title}
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              {detail.headline}
            </h1>
            <p className="mt-5 text-lg text-(--muted) leading-relaxed">
              {detail.intro}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact">
                Talk about your roadmap
                <ArrowRight size={16} />
              </Button>
              <Button href="/services" variant="secondary">
                See services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-1">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
                Where we plug in
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Use cases
              </h2>
            </div>
            <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
              {detail.useCases.map((u) => (
                <li
                  key={u}
                  className="flex gap-3 rounded-lg border border-(--border) bg-(--surface-1) px-4 py-3 text-sm"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 border-y border-(--border) bg-(--surface-2)">
        <Container>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
                Regulatory posture
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-5">
                We engineer with these in mind
              </h3>
              <ul className="space-y-2">
                {detail.regulatoryNotes.map((n) => (
                  <li key={n} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-(--brand-teal) shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
                Tech we&apos;ve shipped
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-5">
                Indicative stack and patterns
              </h3>
              <ul className="space-y-2">
                {detail.techExamples.map((t) => (
                  <li key={t} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
            Other industries
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            Adjacent expertise
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="rounded-lg border border-(--border) bg-(--surface-1) p-5 hover:border-(--brand-violet)/40 transition-colors"
              >
                <div className="text-sm font-semibold tracking-tight">
                  {o.title}
                </div>
                <div className="mt-1 text-xs text-(--muted)">{o.blurb}</div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
