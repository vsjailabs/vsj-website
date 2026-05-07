import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-(--brand-navy) p-10 sm:p-14 text-white">
          <div className="absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-(--brand-violet)/40 via-(--brand-cyan)/30 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-[26rem] h-[26rem] rounded-full bg-gradient-to-tr from-(--brand-teal)/25 to-transparent blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-cyan) mb-4">
              Now open for business
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Ready to put a delivery team behind your roadmap?
            </h2>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">
              Tell us what you&apos;re building. We&apos;ll come back with a delivery
              plan, a fixed first milestone, and a team you can meet next week.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                href="/contact"
                size="lg"
                variant="secondary"
                className="bg-white text-(--brand-navy) border-transparent hover:bg-white/90"
              >
                Talk to us
                <ArrowRight size={16} />
              </Button>
              <Button
                href="/services"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                See what we deliver
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
