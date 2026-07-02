import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { ServicePillars } from "@/components/site/ServicePillars";
import { Process } from "@/components/site/Process";
import { EmergingTech } from "@/components/site/EmergingTech";
import { IndustryGrid } from "@/components/site/IndustryGrid";
import { Certifications } from "@/components/site/Certifications";
import { FAQ } from "@/components/site/FAQ";
import { CTASection } from "@/components/site/CTASection";

// Testimonials + TrustStrip (client logos) intentionally omitted from the homepage
// until real quotes and real client logos are available. Fake placeholders on the
// homepage trust arc do more damage than absence. Re-add once trust.json has
// entries with `placeholder: false`.
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicePillars />
      <Process />
      <EmergingTech />
      <IndustryGrid />
      <Certifications />
      <FAQ />
      <CTASection />
    </>
  );
}
