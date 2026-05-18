import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand,
    short_name: "VSJ",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0e2a47",
    theme_color: "#0e2a47",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/brand/logo-on-white.png",
        sizes: "640x640",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
