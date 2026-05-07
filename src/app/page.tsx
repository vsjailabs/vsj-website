import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Stats } from "@/components/site/Stats";
import { ServicePillars } from "@/components/site/ServicePillars";
import { Process } from "@/components/site/Process";
import { EmergingTech } from "@/components/site/EmergingTech";
import { IndustryGrid } from "@/components/site/IndustryGrid";
import { Testimonials } from "@/components/site/Testimonials";
import { Certifications } from "@/components/site/Certifications";
import { FAQ } from "@/components/site/FAQ";
import { CTASection } from "@/components/site/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Stats />
      <ServicePillars />
      <Process />
      <EmergingTech />
      <IndustryGrid />
      <Testimonials />
      <Certifications />
      <FAQ />
      <CTASection />
    </>
  );
}
