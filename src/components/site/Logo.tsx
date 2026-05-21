import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({
  className = "",
  layout = "horizontal",
  size = 36,
  priority = true,
}: {
  className?: string;
  /** "horizontal" uses the wide wordmark; "stacked" uses the square logo. */
  layout?: "horizontal" | "stacked";
  size?: number;
  /** Set false for below-fold logos (e.g. Footer) to avoid unnecessary preloads. */
  priority?: boolean;
}) {
  const sizeVar = { ["--logo-size" as string]: `${size}px` };

  if (layout === "horizontal") {
    return (
      <>
        {/* Light mode — dark text logo */}
        <Image
          src="/brand/logo-horizontal.png"
          alt={site.brand}
          width={Math.round(size * 3.1)}
          height={size}
          priority={priority}
          className={`block dark:hidden h-[var(--logo-size)] w-auto ${className}`}
          style={sizeVar}
        />
        {/* Dark mode — light text stacked logo (no horizontal-light variant yet) */}
        <Image
          src="/brand/logo-on-black.png"
          alt={site.brand}
          width={size}
          height={size}
          priority={priority}
          className={`hidden dark:block h-[var(--logo-size)] w-auto ${className}`}
          style={sizeVar}
        />
      </>
    );
  }

  return (
    <Image
      src="/brand/logo-on-white.png"
      alt={site.brand}
      width={size}
      height={size}
      priority={priority}
      className={`h-[var(--logo-size)] w-auto ${className}`}
      style={sizeVar}
    />
  );
}
