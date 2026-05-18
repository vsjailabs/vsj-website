import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({
  className = "",
  layout = "horizontal",
  size = 36,
}: {
  className?: string;
  /** "horizontal" uses the wide wordmark; "stacked" uses the square logo. */
  layout?: "horizontal" | "stacked";
  size?: number;
}) {
  if (layout === "horizontal") {
    return (
      <Image
        src="/brand/logo-horizontal.png"
        alt={site.brand}
        width={Math.round(size * 3.1)}
        height={size}
        priority
        className={`h-[var(--logo-size)] w-auto ${className}`}
        style={{ ["--logo-size" as string]: `${size}px` }}
      />
    );
  }

  return (
    <Image
      src="/brand/logo-on-white.png"
      alt={site.brand}
      width={size}
      height={size}
      priority
      className={`h-[var(--logo-size)] w-auto ${className}`}
      style={{ ["--logo-size" as string]: `${size}px` }}
    />
  );
}
