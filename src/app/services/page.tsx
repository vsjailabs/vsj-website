import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicePillars } from "@/components/site/ServicePillars";
import { EmergingTech } from "@/components/site/EmergingTech";
import { CTASection } from "@/components/site/CTASection";
import servicesData from "@/content/services.json";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, AI/ML, cloud & DevOps, and cybersecurity services from VSJ AI Labs.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ])
        )}
      />
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-16">
          <SectionHeading
            eyebrow="Services"
            title="What we deliver."
            description="Four practices, deeply staffed and tightly integrated. Engage a single workstream or compose a full delivery team."
          />
        </Container>
      </section>

      <ServicePillars withLinks={false} />

      <section className="py-16">
        <Container>
          <div className="space-y-16">
            {servicesData.pillars.map((pillar) => (
              <article
                key={pillar.slug}
                id={`${pillar.slug}-detail`}
                className="grid gap-8 lg:grid-cols-3 border-t border-(--border) pt-12"
              >
                <div className="lg:col-span-1">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-(--muted) leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-(--brand-teal) mb-4">
                    Capabilities
                  </div>
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
              </article>
            ))}
          </div>
        </Container>
      </section>

      <EmergingTech />
      <CTASection />
    </>
  );
}
