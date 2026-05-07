import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const stats = [
  { value: site.incorporated, label: "Officially incorporated" },
  { value: "3", label: "Practice areas" },
  { value: "AI-first", label: "Engineering posture" },
  { value: "Compliance-led", label: "Delivery standard" },
];

export function Stats() {
  return (
    <section className="py-12 border-y border-(--border) bg-(--surface-2)">
      <Container>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="text-2xl sm:text-3xl font-semibold tracking-tight text-gradient-brand">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-(--muted)">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
