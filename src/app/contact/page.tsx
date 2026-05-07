import type { Metadata } from "next";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.brand} — start a project, ask about engagements, or explore careers.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
              Contact
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              We respond within one business day. For NDA-required briefs, mention it
              in the message and we&apos;ll send ours.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <aside className="lg:col-span-2 space-y-4">
              <ContactCard icon={Mail} label="Email">
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-(--muted) hover:text-(--foreground)"
                >
                  {site.email}
                </a>
              </ContactCard>

              <ContactCard icon={Phone} label="Phone">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-sm text-(--muted) hover:text-(--foreground)"
                >
                  {site.phone}
                </a>
              </ContactCard>

              <ContactCard icon={Calendar} label="Schedule a call">
                <span className="text-sm text-(--muted)">
                  Prefer a 30-minute intro?{" "}
                  <a
                    href={`mailto:${site.email}?subject=Schedule%20a%20call`}
                    className="underline hover:text-(--foreground)"
                  >
                    Email us
                  </a>{" "}
                  with two time slots.
                </span>
              </ContactCard>

              <ContactCard icon={MapPin} label="Registered office">
                <div className="text-sm text-(--muted) leading-relaxed">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.line3}
                </div>
                <div className="mt-3 text-[11px] font-mono text-(--muted) space-y-0.5">
                  <div>CIN {site.cin}</div>
                  <div>GSTIN {site.gstin}</div>
                </div>
              </ContactCard>
            </aside>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface-1) p-6">
      <div className="flex items-start gap-3">
        <div className="grid place-items-center w-10 h-10 rounded-lg bg-(--brand-violet)/10 text-(--brand-violet) shrink-0">
          <Icon size={18} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{label}</div>
          {children}
        </div>
      </div>
    </div>
  );
}
