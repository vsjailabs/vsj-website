import { Container } from "@/components/ui/Container";

/**
 * Default loading UI shown during route transitions and async data fetches.
 * Renders inside the layout's <main>, so Header + Footer stay visible.
 */
export default function Loading() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl space-y-6">
          <div className="h-3 w-24 rounded bg-(--surface-3) animate-pulse" />
          <div className="h-12 w-full rounded bg-(--surface-3) animate-pulse" />
          <div className="h-12 w-3/4 rounded bg-(--surface-3) animate-pulse" />
          <div className="h-4 w-full rounded bg-(--surface-3) animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-(--surface-3) animate-pulse" />
        </div>
      </Container>
    </section>
  );
}
