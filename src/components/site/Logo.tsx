import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({
  className = "",
  variant = "auto",
  size = 36,
  showWordmark = false,
}: {
  className?: string;
  /** "auto" swaps via prefers-color-scheme. "light" = for dark backgrounds. "dark" = for light backgrounds. */
  variant?: "auto" | "light" | "dark";
  size?: number;
  showWordmark?: boolean;
}) {
  const lightSrc = "/brand/logo-on-black.png";  // white logo, for dark bg
  const darkSrc = "/brand/logo-on-white.png";    // dark logo, for light bg

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {variant === "auto" ? (
        <>
          <Image
            src={darkSrc}
            alt={site.brand}
            width={size}
            height={size}
            priority
            className="block dark:hidden h-[var(--logo-size)] w-auto"
            style={{ ["--logo-size" as string]: `${size}px` }}
          />
          <Image
            src={lightSrc}
            alt={site.brand}
            width={size}
            height={size}
            priority
            className="hidden dark:block h-[var(--logo-size)] w-auto"
            style={{ ["--logo-size" as string]: `${size}px` }}
          />
        </>
      ) : (
        <Image
          src={variant === "light" ? lightSrc : darkSrc}
          alt={site.brand}
          width={size}
          height={size}
          priority
          className="h-[var(--logo-size)] w-auto"
          style={{ ["--logo-size" as string]: `${size}px` }}
        />
      )}
      {showWordmark && (
        <span className="font-semibold tracking-tight text-(--foreground)">
          {site.brand}
        </span>
      )}
    </div>
  );
}
