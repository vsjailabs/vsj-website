import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Auto-generated favicon. Renders the brand mark as a 32×32 PNG.
 * Replace by dropping `app/icon.png` (or icon.svg) — file-based wins over this.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#0e2a47",
          background:
            "linear-gradient(135deg, #7c5cff 0%, #38bdf8 100%)",
          borderRadius: 6,
        }}
      >
        V
      </div>
    ),
    { ...size }
  );
}
