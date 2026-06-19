import { ShieldCheck, Sparkles, Cloud, Briefcase, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Stat = {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
};

const stats: readonly Stat[] = [
  {
    icon: Briefcase,
    value: "9+ Years",
    label: "Technology Leadership",
    description:
      "Senior engineers and solution architects shaping every engagement from kickoff to handover.",
  },
  {
    icon: ShieldCheck,
    value: "Enterprise-Grade",
    label: "Security Focus",
    description:
      "Compliance-first delivery with security, observability, and auditability baked in from day one.",
  },
  {
    icon: Sparkles,
    value: "AI & Cloud",
    label: "Transformation Solutions",
    description:
      "Production-grade AI, ML, and cloud-native platforms — engineered to scale, not to demo.",
  },
  {
    icon: Cloud,
    value: "BFSI · FinTech",
    label: "Regulated-Industry Expertise",
    description:
      "Domain depth across BFSI, Insurance, Healthcare, and Enterprise SaaS programs.",
  },
];

export function Stats() {
  return (
    <section
      aria-labelledby="credibility-heading"
      className="py-16 sm:py-20 border-y border-(--border) bg-(--surface-2)"
    >
      <Container>
        <h2 id="credibility-heading" className="sr-only">
          Why teams partner with VSJ AI Labs
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.label}
                className="group relative flex flex-col rounded-2xl border border-(--border) bg-(--surface-1) p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-(--brand-violet)/10 hover:border-(--brand-violet)/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  aria-hidden="true"
                  className="grid place-items-center h-10 w-10 rounded-lg bg-[linear-gradient(135deg,var(--brand-violet),var(--brand-cyan))] text-white shadow-sm shadow-(--brand-violet)/20"
                >
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-(--foreground)">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-(--brand-teal-text)">
                  {s.label}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-(--muted)">
                  {s.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
