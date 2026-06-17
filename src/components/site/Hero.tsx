import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-(--border)">
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface-1)/70 px-3 py-1 text-xs font-medium text-(--muted) backdrop-blur">
            <Sparkles size={14} className="text-(--brand-violet)" />
            {site.promise}
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-(--brand-navy) dark:text-(--foreground)">
            Wisdom Served Sweet —{" "}
            <span className="text-gradient-brand">AI engineered</span> for regulated industries.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-(--muted) leading-relaxed max-w-2xl">
            VSJ AI Labs partners with banks, insurers, healthcare leaders, and enterprise SaaS
            teams to ship custom software, AI/ML systems, cloud platforms, and security that
            hold up under audit and at scale.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button href="/contact" size="lg">
              Start a project
              <ArrowRight size={16} />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Browse AI &amp; engineering services
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-(--muted)">
            {site.practices.map((p, i) => (
              <span key={p} className="flex items-center gap-x-3">
                {i > 0 && <span className="text-(--brand-teal)">·</span>}
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
