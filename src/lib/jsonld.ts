/**
 * Structured data (JSON-LD) generators.
 *
 * Each helper returns a plain object that Schema.org-compatible crawlers
 * (Google, Bing, AI search engines) parse for rich results and knowledge graphs.
 */
import { site } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}#organization`,
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/logo-on-white.png`,
    description: site.description,
    foundingDate: "2026-04-13",
    email: site.email,
    telephone: site.phone,
    taxID: site.cin,
    vatID: site.gstin,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Mahnar Bazar",
      addressRegion: "Bihar",
      postalCode: "844506",
      addressCountry: "IN",
    },
    sameAs: [site.socials.linkedin, site.socials.github, site.socials.x],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Engineering",
      "Cloud Computing",
      "Cybersecurity",
      "BFSI Technology",
      "Healthcare Technology",
      "Enterprise SaaS",
    ],
    areaServed: ["India", "United States", "United Kingdom", "Singapore", "UAE"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: site.brand,
    publisher: { "@id": `${site.url}#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function serviceJsonLd(service: {
  slug: string;
  title: string;
  summary: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}#service`,
    serviceType: service.title,
    description: service.summary,
    provider: { "@id": `${site.url}#organization` },
    url: `${site.url}/services/${service.slug}`,
    areaServed: ["India", "United States", "United Kingdom", "Singapore", "UAE"],
  };
}

/**
 * Inline a JSON-LD object as a <script type="application/ld+json"> tag.
 * Used inside Server Components to ship structured data with the HTML.
 */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
