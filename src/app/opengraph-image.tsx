import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG image for the entire site. Rendered as a 1200×630 PNG at
 * build time using a Next.js Edge runtime. To override per-route, place
 * a file named `opengraph-image.tsx` inside that route's folder.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0e2a47 0%, #1b3a5c 45%, #143659 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative gradient blob */}
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -200,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(124,92,255,0.55), rgba(56,189,248,0.25), transparent 70%)",
            filter: "blur(8px)",
            display: "flex",
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #7c5cff 0%, #38bdf8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#0e2a47",
            }}
          >
            V
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.4 }}>
              {site.brand}
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#a0c2e8",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Pvt. Ltd.
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              color: "#38bdf8",
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {site.promise}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#cfe1f5",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            {site.practices.map((p, i) => (
              <span key={p} style={{ display: "flex", gap: 24 }}>
                {i > 0 && <span style={{ color: "#14b8a6" }}>·</span>}
                <span>{p}</span>
              </span>
            ))}
          </div>
          <div style={{ color: "#7e9dc4" }}>vsjailabs.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
