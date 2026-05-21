import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { IndustryGrid } from "@/components/site/IndustryGrid";
import { CTASection } from "@/components/site/CTASection";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industries served by VSJ AI Labs — BFSI, healthcare, retail, manufacturing, public sector, and SaaS.",
  alternates: { canonical: `${site.url}/industries` },
};

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Industries", href: "/industries" },
          ])
        )}
      />
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
              Industries
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              Patterns we&apos;ve seen before.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              Every industry has its own gravity — regulatory floors, integration
              hairballs, customer expectations. We start engagements already knowing
              the failure modes.
            </p>
          </div>
        </Container>
      </section>

      <IndustryGrid />
      <CTASection />
    </>
  );
}
