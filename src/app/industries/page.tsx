import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { IndustryGrid } from "@/components/site/IndustryGrid";
import { CTASection } from "@/components/site/CTASection";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Compliance-first AI and enterprise software for BFSI, Healthcare, and Enterprise SaaS — regulatory floors, integration hairballs, and customer expectations we already know.",
  alternates: { canonical: `${site.url}/industries` },
  openGraph: {
    title: `Industries We Serve | ${site.brand}`,
    description:
      "BFSI · Healthcare · Enterprise SaaS — engagements shaped around the regulations and integrations of each industry.",
    url: `${site.url}/industries`,
  },
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
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
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
