import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import faqData from "@/content/faq.json";
import { jsonLdScript } from "@/lib/jsonld";

function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}

export function FAQ() {
  return (
    <section className="py-24 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqData.items))}
      />
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions, straight answers."
          description="If yours isn't here, reach out — we'll send a real reply, not a sales sequence."
        />

        <div className="mt-12 grid gap-3">
          {faqData.items.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-xl border border-(--border) bg-(--surface-1) px-5 sm:px-6 py-4 open:bg-(--surface-2)"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg font-medium tracking-tight">
                  {item.q}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 grid place-items-center w-6 h-6 rounded-full border border-(--border) text-(--muted) group-open:rotate-45 transition-transform"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm sm:text-[15px] text-(--muted) leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
