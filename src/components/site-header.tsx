"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { GithubIcon } from "@/components/icons";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-colors",
        scrolled && "border-border bg-surface/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-mono text-lg text-text">
          relay
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-border hover:text-text"
            >
              {link.label === "GitHub" && <GithubIcon className="size-4" />}
              {link.label}
              {link.meta && <span className="font-mono text-xs">{link.meta}</span>}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <WaitlistDialog
            trigger={
              <Button type="button" className="hidden sm:inline-flex">
                Start free
              </Button>
            }
          />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
