export const site = {
  legalName: "VSJ AI Labs Pvt. Ltd.",
  brand: "VSJ AI Labs",
  tagline: "Wisdom Served Sweet.",
  promise: "Compliance-first AI for regulated industries.",
  description:
    "VSJ AI Labs builds compliance-first AI, custom software, and cloud platforms for BFSI, healthcare, and enterprise SaaS leaders.",
  url: "https://vsjailabs.com",
  email: "support@vsjailabs.com",
  phone: "+91 62805 97727",
  cin: "U62013BR2026PTC084210",
  gstin: "10AAMCV0989J1ZZ",
  incorporated: "13 April 2026",
  address: {
    line1: "C/o Dhananjay Kumar 1, 2, Ward No. 19",
    line2: "Fatehpur Kamali, Mahnar Bazar",
    line3: "Vaishali, Bihar — 844506",
    country: "India",
  },
  practices: ["BFSI", "Healthcare", "Enterprise SaaS"],
  socials: {
    linkedin: "https://www.linkedin.com/company/vsj-ai-labs",
    github: "https://github.com/vsj-ai-labs",
    x: "https://x.com/vsjailabs",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
