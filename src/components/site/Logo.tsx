import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Brand logo with automatic light/dark mode switching.
 *
 * Asset mapping:
 *   Light mode → /brand/logo-horizontal-light.png (dark text, for light backgrounds)
 *   Dark mode  → /brand/logo-horizontal-dark.png  (white text, for dark backgrounds)
 */

/** Logo for light backgrounds (dark text) — shown in light mode */
const HORIZONTAL_FOR_LIGHT_BG = "/brand/logo-horizontal-light.png";
/** Logo for dark backgrounds (white text) — shown in dark mode */
const HORIZONTAL_FOR_DARK_BG = "/brand/logo-horizontal-dark.png";

export function Logo({
  className = "",
  size = 36,
  priority = true,
}: {
  className?: string;
  size?: number;
  /** Set false for below-fold logos (e.g. Footer) to avoid unnecessary preloads. */
  priority?: boolean;
}) {
  const sizeVar = { ["--logo-size" as string]: `${size}px` };
  const w = Math.round(size * 3.1);
  const cls = `h-[var(--logo-size)] w-auto ${className}`;

  return (
    <>
      {/* Light mode — dark text on light backgrounds */}
      <Image
        src={HORIZONTAL_FOR_LIGHT_BG}
        alt={site.brand}
        width={w}
        height={size}
        priority={priority}
        className={`block dark:hidden ${cls}`}
        style={sizeVar}
      />
      {/* Dark mode — white text on dark backgrounds */}
      <Image
        src={HORIZONTAL_FOR_DARK_BG}
        alt={site.brand}
        width={w}
        height={size}
        priority={priority}
        className={`hidden dark:block ${cls}`}
        style={sizeVar}
      />
    </>
  );
}
