import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import servicesData from "@/content/services.json";

export function EmergingTech() {
  return (
    <section className="py-24 sm:py-28 border-y border-(--border) bg-(--surface-2)">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <SectionHeading
            eyebrow="Emerging tech"
            title="Applied research, not slideware."
            description="We work where the frontier meets production: LLM agents, multimodal pipelines, smart contracts, and IoT systems. We pick the right tool — even when that tool is boring."
          />
          <div className="flex flex-wrap gap-3">
            {servicesData.emergingTech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-(--border) bg-(--surface-1) px-4 py-2 text-sm font-medium text-(--foreground)"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
