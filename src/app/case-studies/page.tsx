import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/site/CTASection";
import cases from "@/content/case-studies.json";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `Selected work delivered by ${site.brand} across BFSI, healthcare, and enterprise SaaS.`,
  alternates: { canonical: `${site.url}/case-studies` },
};

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
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              Outcomes we&apos;ve shipped.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              Three recent engagements with redacted client names. Reach out
              for the unredacted brief and references.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.items.map((c) => (
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

                {c.placeholder && (
                  <div className="mt-4 text-[10px] uppercase tracking-wider text-(--brand-orange) font-semibold">
                    Placeholder · replace before launch
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-(--border) bg-(--surface-2) p-6 sm:p-8 text-sm text-(--muted) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-(--foreground) font-medium mb-1">
                Have a similar problem?
              </div>
              <div>
                Send us a brief and we&apos;ll come back with how we&apos;d
                approach it — no pitch deck, just engineering.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-(--brand-violet-2) hover:text-(--brand-violet) font-medium"
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
