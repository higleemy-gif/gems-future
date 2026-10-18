"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui";
import { MenuIcon, XIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Why Gems Future", href: "#why" },
  { label: "Career Guidance", href: "/start" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-surface/80 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-surface/0",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          aria-label="Gems Future home"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Logo height={44} />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-soft-blue hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Login
          </Link>
          <ButtonLink href="/start" size="sm">
            Sign Up
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-soft-blue hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open ? (
        <div className="sm:hidden">
          <div className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-border bg-surface p-3 shadow-soft">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-soft-blue hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-2 hover:text-primary"
              >
                Login
              </Link>
              <ButtonLink href="/start" fullWidth onClick={() => setOpen(false)}>
                Sign Up
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
