import type { Metadata } from "next";
import { ShieldCheck, Lock, Server, FileText, KeyRound, GitBranch } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/site/CTASection";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description:
    "How VSJ AI Labs protects client data — infrastructure controls, application hardening, DPDP Act & GDPR alignment, and our SOC 2 / ISO 27001 roadmap.",
  alternates: { canonical: `${site.url}/security` },
  openGraph: {
    title: `Security & Compliance | ${site.brand}`,
    description:
      "Compliance-first AI is a positioning claim we back with controls, not slideware. Current posture + roadmap.",
    url: `${site.url}/security`,
  },
};

const currentControls = [
  {
    icon: ShieldCheck,
    title: "Application security",
    body: "Content Security Policy enforced site-wide. HSTS with preload. HttpOnly + SameSite=Lax session cookies. Honeypot + dwell-time guards on public forms. Least-privilege API tokens with rotation.",
  },
  {
    icon: Server,
    title: "Infrastructure & data",
    body: "Data hosted in the India region on a hardened Linux VM. Docker isolation between the marketing site, CRM, and project-management stacks. Row-level tenancy in customer-facing databases. Encrypted TLS via Let's Encrypt with auto-renewal.",
  },
  {
    icon: Lock,
    title: "Access control",
    body: "SSH key–only authentication on production hosts. Role-based access in the CRM and project-management systems. Multi-factor authentication on all admin surfaces. API keys stored in server-side environment files, never in the repo.",
  },
  {
    icon: FileText,
    title: "Regulatory alignment",
    body: "India Digital Personal Data Protection Act 2023 aligned. EU GDPR aligned for European visitor traffic. Named Grievance Officer per DPDP §32. Consent-gated cookies with per-category opt-in. Data-retention windows published in the Privacy Policy.",
  },
  {
    icon: KeyRound,
    title: "Credential & secret hygiene",
    body: "No secrets in git. All API keys and connection strings live in server-side environment files with restricted file-mode permissions. Contact-form submissions never touch third-party marketing platforms.",
  },
  {
    icon: GitBranch,
    title: "Change management",
    body: "Every production change goes through a reviewed commit on the main branch. Deploys use a Capistrano-style release path with rollback available. Build artifacts are reproducible from git.",
  },
];

const roadmap = [
  {
    horizon: "2026 Q4",
    items: [
      "Formal information-security policy set, ratified by leadership.",
      "Vendor security assessments for every processor named in the Privacy Policy.",
      "Documented incident-response runbook with defined RTO / RPO targets.",
    ],
  },
  {
    horizon: "2027 H1",
    items: [
      "SOC 2 Type I readiness assessment.",
      "ISO 27001:2022 gap analysis with a scoped ISMS.",
      "Third-party penetration test on the marketing site + CRM boundary.",
    ],
  },
  {
    horizon: "2027 H2 → 2028",
    items: [
      "ISO 27001 certification (targeting Q4 2027).",
      "SOC 2 Type II report.",
      "Continuous compliance monitoring integrated into the delivery workflow.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Security", href: "/security" },
          ])
        )}
      />
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              Security &amp; Compliance
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Compliance-first, not compliance-theatre.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              &ldquo;Compliance-first AI&rdquo; is our positioning. This page is
              the receipt — the controls we run today, the alignment we already
              have, and the certifications we&apos;re working toward. Written
              to be inspected by a CISO or procurement team, not just a
              marketing reader.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              Current posture
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Six control families in production today.
            </h2>
            <p className="mt-4 text-(--muted) leading-relaxed">
              Every item below is live on our production infrastructure right
              now — not on a roadmap, not aspirational. Reach out for a copy of
              the underlying configuration or a walk-through with our CTO.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentControls.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.title}
                  className="rounded-2xl border border-(--border) bg-(--surface-1) p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-(--brand-violet)/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div
                    aria-hidden="true"
                    className="grid place-items-center h-10 w-10 rounded-lg bg-[linear-gradient(135deg,var(--brand-violet),var(--brand-cyan))] text-white shadow-sm shadow-(--brand-violet)/20"
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--muted)">
                    {c.body}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 border-y border-(--border) bg-(--surface-2)">
        <Container>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              Certification roadmap
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What we&apos;re working toward.
            </h2>
            <p className="mt-4 text-(--muted) leading-relaxed">
              Formal certifications take time and shouldn&apos;t be faked. Here&apos;s
              the honest timeline — dates are targets, not marketing.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {roadmap.map((r) => (
              <article
                key={r.horizon}
                className="rounded-2xl border border-(--border) bg-(--surface-1) p-6 shadow-sm"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-(--brand-teal-text)">
                  {r.horizon}
                </div>
                <ul className="mt-4 space-y-3 text-sm text-(--foreground)/85 leading-relaxed">
                  {r.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
              For enterprise reviewers
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              How to run diligence on us.
            </h2>
            <p className="mt-4 text-(--muted) leading-relaxed">
              We&apos;re happy to answer detailed security questionnaires (CAIQ,
              SIG Lite, vendor risk forms) and sign NDAs so we can share
              architecture, threat models, and access diagrams. Ask for:
            </p>
            <ul className="mt-6 space-y-3 text-(--foreground)/85 leading-relaxed">
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0"
                />
                <span>
                  <strong>Architecture &amp; data-flow diagrams</strong> for the
                  environment your engagement will run in.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0"
                />
                <span>
                  <strong>Sub-processor list &amp; DPA copies</strong> — the
                  named processors from our Privacy Policy, plus any
                  engagement-specific vendors.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0"
                />
                <span>
                  <strong>Access &amp; identity model</strong> — how our
                  engineers get least-privilege access to client systems and
                  how we revoke on engagement close.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 rounded-full bg-(--brand-violet) shrink-0"
                />
                <span>
                  <strong>Incident response commitments</strong> — RTO / RPO
                  targets, breach notification timelines, and escalation
                  contacts.
                </span>
              </li>
            </ul>
            <p className="mt-8 text-sm text-(--muted) leading-relaxed">
              Security contact: <a href={`mailto:${site.email}`} className="underline hover:text-(--foreground)">{site.email}</a>. Mark
              &ldquo;Security review&rdquo; in the subject and our CTO gets it
              directly.
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
