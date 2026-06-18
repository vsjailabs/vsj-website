import { Award, Shield, Lock, Sparkles, Users, ScrollText, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import trust from "@/content/trust.json";

const iconByTitle: Record<string, LucideIcon> = {
  "MSME Registered": Award,
  "Startup India Recognized": Sparkles,
  "ISO 27001 Readiness": Shield,
  "SOC 2 Type II Aligned": Lock,
  "NASSCOM Member": Users,
  "DPDPA-Aligned": ScrollText,
};

const statusStyle: Record<string, { label: string; cls: string }> = {
  active: {
    label: "Active",
    cls: "bg-(--brand-teal)/10 text-(--brand-teal-text) border-(--brand-teal)/30",
  },
  "in-progress": {
    label: "In progress",
    cls: "bg-(--brand-orange)/10 text-(--brand-orange) border-(--brand-orange)/30",
  },
  planned: {
    label: "Planned",
    cls: "bg-(--surface-3) text-(--muted) border-(--border)",
  },
};

export function Certifications() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Trust posture"
          title="Compliance, on the record."
          description="What we hold today and what's on the calendar — auditable, not aspirational."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trust.certifications.map((c) => {
            const Icon = iconByTitle[c.title] ?? Award;
            const style = statusStyle[c.status] ?? statusStyle.planned;
            return (
              <div
                key={c.title}
                className="rounded-xl border border-(--border) bg-(--surface-1) p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-(--brand-violet)/10 text-(--brand-violet)">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.cls}`}
                  >
                    {style.label}
                  </span>
                </div>
                <div className="mt-4 text-sm font-semibold tracking-tight">
                  {c.title}
                </div>
                <div className="mt-0.5 text-xs text-(--muted)">{c.subtitle}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
