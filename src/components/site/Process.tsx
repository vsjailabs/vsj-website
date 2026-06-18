import { Compass, PenTool, Hammer, LineChart, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = {
  num: string;
  icon: LucideIcon;
  title: string;
  duration: string;
  body: string;
  outputs: string[];
};

const steps: Step[] = [
  {
    num: "01",
    icon: Compass,
    title: "Discover",
    duration: "1–2 weeks",
    body:
      "We map the business outcome, the constraints, and the systems already in play. Output is a problem statement we both sign off on — not a 'do everything' SOW.",
    outputs: ["Problem brief", "System map", "Risk register"],
  },
  {
    num: "02",
    icon: PenTool,
    title: "Design",
    duration: "1–3 weeks",
    body:
      "Architecture, data model, UX flows, and a phased delivery plan with clear milestones and acceptance criteria. We commit to a fixed first milestone.",
    outputs: ["Architecture decision records", "Phased roadmap", "Acceptance criteria"],
  },
  {
    num: "03",
    icon: Hammer,
    title: "Build",
    duration: "Per phase",
    body:
      "Two-week sprints, demos at every cadence, code in your repos from day one. Tests, observability, and security baked in — not bolted on.",
    outputs: ["Working software", "Automated test coverage", "Runbooks"],
  },
  {
    num: "04",
    icon: LineChart,
    title: "Operate",
    duration: "Optional",
    body:
      "Hand off to your team, or stay on for managed operations and continuous improvement. We don't lock you in — we leave docs and engineers your team can extend.",
    outputs: ["Knowledge transfer", "On-call rotation", "Metrics review"],
  },
];

export function Process() {
  return (
    <section className="py-24 sm:py-28 border-y border-(--border) bg-(--surface-2)">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A four-stage engagement model."
          description="Predictable phases, signed-off milestones, and a fixed first deliverable. Procurement-friendly by design."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.num}
                className="relative rounded-xl border border-(--border) bg-(--surface-1) p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="grid place-items-center w-11 h-11 rounded-lg bg-(--brand-violet)/10 text-(--brand-violet)">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-sm text-(--brand-teal-text)">
                    {s.num}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <div className="text-xs text-(--muted) mt-0.5">
                  {s.duration}
                </div>
                <p className="mt-3 text-sm text-(--muted) leading-relaxed">
                  {s.body}
                </p>
                <div className="mt-5 pt-5 border-t border-(--border)">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-2">
                    Outputs
                  </div>
                  <ul className="space-y-1.5">
                    {s.outputs.map((o) => (
                      <li
                        key={o}
                        className="flex gap-2 text-xs text-(--foreground)/85"
                      >
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-(--brand-violet)" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
