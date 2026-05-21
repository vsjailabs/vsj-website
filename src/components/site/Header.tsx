"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/site/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--surface-1)/85 backdrop-blur supports-[backdrop-filter]:bg-(--surface-1)/70">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label={site.brand} className="shrink-0">
            <Logo size={44} />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "text-(--foreground) bg-(--surface-2)"
                      : "text-(--muted) hover:text-(--foreground) hover:bg-(--surface-2)"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button href="/contact" variant="primary">
              Talk to us
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-(--surface-2)"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-(--foreground) hover:bg-(--surface-2)"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                href="/contact"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Talk to us
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
