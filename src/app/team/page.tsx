import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/site/CTASection";
import { LeadershipCard, type Leader } from "@/components/site/LeadershipCard";
import team from "@/content/team.json";
import { site } from "@/lib/site";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  leadershipJsonLd,
} from "@/lib/jsonld";

const leaders = team.leadership as readonly Leader[];

export const metadata: Metadata = {
  title: "Leadership — AI, Cloud & BFSI Engineers",
  description:
    "Meet the leadership of VSJ AI Labs — business strategy, enterprise architecture, and large-scale delivery across BFSI, Healthcare, and Enterprise SaaS.",
  alternates: { canonical: `${site.url}/team` },
  openGraph: {
    title: `Leadership Team | ${site.brand}`,
    description:
      "The Founder & CEO and CTO driving VSJ AI Labs' compliance-first engineering practice.",
    url: `${site.url}/team`,
  },
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Team", href: "/team" },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(leadershipJsonLd(leaders))}
      />
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              Team
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              The people you&apos;ll actually work with.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              Senior leaders stay close to delivery — the engineers shaping
              your engagement are the ones you meet on day one.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div
            className={
              leaders.length >= 3
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto"
            }
          >
            {leaders.map((person) => (
              <LeadershipCard key={person.slug} person={person} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
