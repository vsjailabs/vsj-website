import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 110,
          fontWeight: 700,
          color: "#0e2a47",
          background:
            "linear-gradient(135deg, #7c5cff 0%, #38bdf8 100%)",
          borderRadius: 36,
        }}
      >
        V
      </div>
    ),
    { ...size }
  );
}
