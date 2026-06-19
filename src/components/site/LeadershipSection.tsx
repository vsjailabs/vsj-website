import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipCard, type Leader } from "@/components/site/LeadershipCard";
import team from "@/content/team.json";

const leaders = team.leadership as readonly Leader[];

export function LeadershipSection({
  eyebrow = "Leadership",
  title = "Leadership that understands enterprise technology.",
  description = "Our leadership team combines expertise in business strategy, enterprise architecture, cloud-native engineering, AI innovation, and large-scale program delivery. Together, we help organizations build secure, scalable, and future-ready digital solutions across BFSI, Healthcare, SaaS, and Enterprise domains.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
} = {}) {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((person) => (
            <LeadershipCard key={person.slug} person={person} />
          ))}
        </div>
      </Container>
    </section>
  );
}
