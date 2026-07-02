import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/site/CTASection";
import cases from "@/content/case-studies.json";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Client Work & Case Studies",
  description:
    "Selected engagements delivered by VSJ AI Labs across BFSI, healthcare, and enterprise SaaS — including AI, cloud modernization, and compliance-first custom software.",
  alternates: { canonical: `${site.url}/case-studies` },
  openGraph: {
    title: `Client Work & Case Studies | ${site.brand}`,
    description:
      "Redacted-but-real engagement stories: BFSI, healthcare, and enterprise SaaS programs shipped by VSJ AI Labs.",
    url: `${site.url}/case-studies`,
  },
};

const publishedCases = cases.items.filter((c) => !c.placeholder);

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Case Studies", href: "/case-studies" },
          ])
        )}
      />
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              Case Studies
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Client work in flight.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              Current engagements are under NDA — the detailed briefs, metrics, and reference calls
              are available on request. Send us a note describing the shape of your problem and we&apos;ll
              share the closest match from live work.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {publishedCases.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publishedCases.map((c) => (
                <article
                  key={c.slug}
                  className="group flex flex-col rounded-xl border border-(--border) bg-(--surface-1) p-6 hover:border-(--brand-violet)/40 transition-colors"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text)">
                    {c.industry}
                  </div>
                  <h3 className="mt-3 text-base sm:text-lg font-semibold tracking-tight leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm text-(--muted) leading-relaxed">
                    {c.summary}
                  </p>

                  <dl className="mt-5 grid grid-cols-3 gap-2">
                    {c.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-md bg-(--surface-2) p-2.5 text-center"
                      >
                        <dt className="text-[10px] text-(--muted) leading-tight">
                          {m.label}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-gradient-brand">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 pt-5 border-t border-(--border) flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-mono text-(--muted) bg-(--surface-2) rounded px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  industry: "BFSI",
                  headline: "Allocation MIS & partner-bank integrations",
                  detail:
                    "Live engagement with a top-10 life insurer — dynamic MIS pipeline, secure Axis / Yes Bank integrations, PL/pgSQL stored-procedure architecture. Details on request.",
                },
                {
                  industry: "Healthcare",
                  headline: "Claims prior-authorization automation",
                  detail:
                    "Tier-1 healthcare provider — clinical rules engine plus compliance-first document workflows. Reference call available under NDA.",
                },
                {
                  industry: "Enterprise SaaS",
                  headline: "Multi-tenant scale-up on AWS",
                  detail:
                    "Series-B SaaS platform — tenancy re-architecture, row-level security, Kubernetes migration, observability. Full walk-through by our CTO on request.",
                },
              ].map((c) => (
                <article
                  key={c.headline}
                  className="flex flex-col rounded-xl border border-dashed border-(--border) bg-(--surface-1) p-6"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text)">
                    {c.industry} · Under NDA
                  </div>
                  <h3 className="mt-3 text-base sm:text-lg font-semibold tracking-tight leading-snug">
                    {c.headline}
                  </h3>
                  <p className="mt-3 text-sm text-(--muted) leading-relaxed">
                    {c.detail}
                  </p>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-xl border border-(--border) bg-(--surface-2) p-6 sm:p-8 text-sm text-(--muted) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-(--foreground) font-medium mb-1">
                Want the unredacted brief?
              </div>
              <div>
                Tell us the shape of your problem and we&apos;ll share the
                closest match from live work — including metrics, stack, and
                a reference call.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-(--brand-violet-2) hover:text-(--brand-violet) font-medium whitespace-nowrap"
            >
              Send a brief
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
