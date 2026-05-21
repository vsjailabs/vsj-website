import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { site } from "@/lib/site";
import servicesData from "@/content/services.json";
import industriesData from "@/content/industries.json";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-(--border) bg-(--surface-2)">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2 max-w-md">
            <Logo size={56} priority={false} />
            <p className="mt-4 text-sm text-(--muted) leading-relaxed">
              {site.description}
            </p>
            <div className="mt-5 text-xs text-(--muted) space-y-1.5">
              <div className="font-medium text-(--foreground)">{site.legalName}</div>
              <div>{site.address.line1}</div>
              <div>{site.address.line2}</div>
              <div>{site.address.line3}</div>
              <div className="pt-2">
                <a href={`mailto:${site.email}`} className="hover:text-(--foreground)">
                  {site.email}
                </a>
                {" · "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-(--foreground)">
                  {site.phone}
                </a>
              </div>
              <div className="pt-1 font-mono text-[11px]">CIN {site.cin}</div>
              <div className="font-mono text-[11px]">GSTIN {site.gstin}</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-(--foreground) mb-3">
              Services
            </div>
            <ul className="space-y-2 text-sm text-(--muted)">
              {servicesData.pillars.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/services/${p.slug}`}
                    className="hover:text-(--foreground)"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-(--foreground) mb-3">
              Industries
            </div>
            <ul className="space-y-2 text-sm text-(--muted)">
              {industriesData.industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="hover:text-(--foreground)"
                  >
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-(--foreground) mb-3">
              Company
            </div>
            <ul className="space-y-2 text-sm text-(--muted)">
              {companyLinks.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="hover:text-(--foreground)">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-(--foreground) mb-3">
              Legal
            </div>
            <ul className="space-y-2 text-sm text-(--muted)">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-(--foreground)">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-(--border) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-(--muted)">
          <div>
            © {year} {site.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={site.socials.linkedin} target="_blank" rel="noopener me" aria-label="VSJ AI Labs on LinkedIn" className="hover:text-(--foreground)">LinkedIn</a>
            <a href={site.socials.github} target="_blank" rel="noopener me" aria-label="VSJ AI Labs on GitHub" className="hover:text-(--foreground)">GitHub</a>
            <a href={site.socials.x} target="_blank" rel="noopener me" aria-label="VSJ AI Labs on X" className="hover:text-(--foreground)">X</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
