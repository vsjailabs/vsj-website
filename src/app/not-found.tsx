import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <div className="text-7xl sm:text-8xl font-semibold tracking-tight text-gradient-brand">
            404
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-4 text-(--muted) leading-relaxed">
            The URL may have been moved, renamed, or never existed. Let&apos;s
            point you back somewhere useful.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/services" variant="secondary">
              Browse AI &amp; engineering services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
