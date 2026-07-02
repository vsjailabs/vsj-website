import type { NextConfig } from "next";

/**
 * Content Security Policy
 *
 * Started in Report-Only mode so we can graduate to enforcement after
 * collecting violation reports for ~2 weeks. To enforce, change the
 * header key from `Content-Security-Policy-Report-Only` to
 * `Content-Security-Policy` below.
 */
// Optional analytics origin — allowlisted in script-src + connect-src when
// NEXT_PUBLIC_PLAUSIBLE_SRC is set to an external URL. When unset (or set to
// a same-origin self-hosted URL), CSP stays maximally strict.
const analyticsOrigin = (() => {
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;
  if (!src) return "";
  try {
    const u = new URL(src);
    return u.origin;
  } catch {
    return "";
  }
})();

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  // Next.js + Tailwind v4 require unsafe-inline for styles
  "style-src 'self' 'unsafe-inline'",
  // Next.js dev/Turbopack uses inline scripts; tighten in production with nonces if needed
  `script-src 'self' 'unsafe-inline' 'unsafe-eval'${analyticsOrigin ? " " + analyticsOrigin : ""}`,
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${analyticsOrigin ? " " + analyticsOrigin : ""}`,
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

  // Inline Tailwind's atomic CSS into the document head. Removes the
  // render-blocking <link> round-trip flagged by PageSpeed (~120ms) and
  // eliminates the FOUT window that was driving CLS via font-swap.
  // Production-only — dev still uses external <link> for HMR.
  experimental: {
    inlineCss: true,
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
