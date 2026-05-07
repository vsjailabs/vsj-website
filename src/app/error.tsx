"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Route-segment error boundary. Catches errors thrown in any
 * descendant Server / Client Component during rendering.
 *
 * Must be a Client Component because it receives `reset()`.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook a real error reporter here (Sentry, PostHog, etc.) once configured
    if (process.env.NODE_ENV !== "production") {
      console.error("[error.tsx]", error);
    }
  }, [error]);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-orange) mb-3">
            Something went wrong
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            We hit an unexpected error rendering this page.
          </h1>
          <p className="mt-4 text-(--muted) leading-relaxed">
            Our team has been notified. You can retry, head home, or reach out if
            this keeps happening.
          </p>
          {error.digest && (
            <p className="mt-6 text-xs text-(--muted) font-mono">
              Reference: {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button onClick={() => reset()}>Try again</Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
