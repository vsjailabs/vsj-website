import type { NextConfig } from "next";

/**
 * Content Security Policy
 *
 * Started in Report-Only mode so we can graduate to enforcement after
 * collecting violation reports for ~2 weeks. To enforce, change the
 * header key from `Content-Security-Policy-Report-Only` to
 * `Content-Security-Policy` below.
 */
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  // Next.js + Tailwind v4 require unsafe-inline for styles
  "style-src 'self' 'unsafe-inline'",
  // Next.js dev/Turbopack uses inline scripts; tighten in production with nonces if needed
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Force HTTPS, opt into the browser HSTS preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Block MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevent the site from being embedded in an iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Hide referrer when leaving the site
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we don't need
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  // Cross-origin isolation hints
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Enforced CSP — promoted from Report-Only on 2026-05-21
  {
    key: "Content-Security-Policy",
    value: cspDirectives,
  },
];

const nextConfig: NextConfig = {
  // Strip the X-Powered-By: Next.js fingerprint
  poweredByHeader: false,

  // Enable React's strict double-render in dev
  reactStrictMode: true,

  // Tree-shake icon barrels so only the imported lucide glyphs ship — addresses
  // PageSpeed "Reduce unused JavaScript" (~27 KiB) finding.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Allow remote brand assets later (e.g., CDN-hosted partner logos)
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
