import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal-text) mb-3">
            Legal
          </div>
          <nav className="space-y-1">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm text-(--muted) hover:text-(--foreground) hover:bg-(--surface-2)"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="lg:col-span-3 prose-legal">{children}</article>
      </div>
    </Container>
  );
}
