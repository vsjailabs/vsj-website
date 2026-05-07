import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-violet) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-brand hover:opacity-95 shadow-md shadow-(--brand-violet)/25",
  secondary:
    "border border-(--border) bg-(--surface-1) text-(--foreground) hover:bg-(--surface-2)",
  ghost:
    "text-(--foreground) hover:bg-(--surface-2)",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button(
  props:
    | (CommonProps & { href: string; type?: never } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">)
    | (CommonProps & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
