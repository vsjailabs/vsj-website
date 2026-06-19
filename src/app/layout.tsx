import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { SkipLink } from "@/components/site/SkipLink";
import { site } from "@/lib/site";
import { jsonLdScript, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | AI, Cloud & Enterprise Software Solutions`,
    template: `%s | ${site.brand}`,
  },
  description:
    "VSJ AI Labs delivers compliance-first AI solutions, enterprise software development, cloud modernization, cybersecurity, and digital transformation services for BFSI, Healthcare, and SaaS organizations.",
  applicationName: site.brand,
  authors: [{ name: site.legalName, url: site.url }],
  keywords: [
    "VSJ AI Labs",
    "AI services India",
    "BFSI software",
    "Healthcare AI",
    "Enterprise SaaS development",
    "Compliance-first AI",
    "Custom software development India",
    "Cloud migration",
    "Cybersecurity",
  ],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} | AI, Cloud & Enterprise Software Solutions`,
    description:
      "Compliance-first AI, enterprise software, cloud modernization, and cybersecurity for BFSI, Healthcare, and SaaS organizations.",
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.brand} — AI, Cloud & Enterprise Software Solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vsjailabs",
    creator: "@vsjailabs",
    title: `${site.brand} | AI, Cloud & Enterprise Software Solutions`,
    description:
      "Compliance-first AI, enterprise software, cloud modernization, and cybersecurity for BFSI, Healthcare, and SaaS organizations.",
    images: ["/opengraph-image"],
  },
  icons: {
    // The favicon.ico is auto-linked by Next.js from app/favicon.ico (with
    // cache-busting hash) — no need to list it here. This block adds the
    // brand logo as the high-res icon and the Apple touch icon.
    icon: [
      { url: "/brand/logo-on-white.png", type: "image/png", sizes: "640x640" },
    ],
    apple: "/brand/logo-on-white.png",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e2a47" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
