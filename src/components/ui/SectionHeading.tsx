import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-(--muted) leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
