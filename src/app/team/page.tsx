import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/site/CTASection";
import team from "@/content/team.json";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description: `Leadership at ${site.brand}.`,
  alternates: { canonical: `${site.url}/team` },
};

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
              Team
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              The people you&apos;ll actually work with.
            </h1>
            <p className="mt-6 text-lg text-(--muted) leading-relaxed">
              Senior leaders stay close to delivery — the engineers shaping
              your engagement are the ones you meet on day one.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.leadership.map((p) => (
              <article
                key={p.slug}
                className="rounded-xl border border-(--border) bg-(--surface-1) p-6"
              >
                <div className="aspect-square rounded-lg bg-gradient-to-br from-(--brand-violet)/10 via-(--surface-2) to-(--brand-cyan)/10 grid place-items-center text-(--muted) text-xs uppercase tracking-wider">
                  Photo
                </div>
                <div className="mt-5">
                  <div className="text-base font-semibold tracking-tight">
                    {p.name}
                  </div>
                  <div className="text-xs text-(--brand-teal) font-medium uppercase tracking-wider mt-0.5">
                    {p.role}
                  </div>
                  <p className="mt-3 text-sm text-(--muted) leading-relaxed">
                    {p.bio}
                  </p>
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-(--muted) hover:text-(--brand-violet)"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {p.placeholder && (
                    <div className="mt-3 text-[10px] uppercase tracking-wider text-(--brand-orange) font-semibold">
                      Placeholder · replace before launch
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
