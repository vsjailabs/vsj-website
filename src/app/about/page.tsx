import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/site/CTASection";
import { Stats } from "@/components/site/Stats";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "VSJ AI Labs is an India-headquartered technology services company building software, AI, and cloud systems for global enterprises.",
  alternates: { canonical: `${site.url}/about` },
};

const values = [
  {
    title: "Outcomes over outputs.",
    body: "We measure ourselves by what shipped, what users adopted, and what metric moved — not by hours billed.",
  },
  {
    title: "Engineering rigor at every level.",
    body: "Code review, automated tests, observability, and security baked in from day one — not retrofitted under audit pressure.",
  },
  {
    title: "Transparent partnership.",
    body: "Clear roadmaps, honest trade-offs, no surprise change orders. We work how you'd want your own team to work.",
  },
  {
    title: "Built for the long horizon.",
    body: "We design systems your future engineers can extend — not vendor lock-ins that decay into rewrites.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ])
        )}
      />
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
              About VSJ AI Labs
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              We build the technology backbones that businesses run on.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              VSJ AI Labs is an India-headquartered technology company providing
              software development, AI/ML, cloud, and cybersecurity services to
              enterprises and high-growth startups across India and abroad. We exist
              to take ambitious software roadmaps and turn them into systems that
              actually run in production.
            </p>
          </div>
        </Container>
      </section>

      <Stats />

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Principles, not posters."
            description="A short list of beliefs that shape how we engage, how we engineer, and how we charge."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-(--border) bg-(--surface-1) p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-(--muted) leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
