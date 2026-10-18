import Link from "next/link";
import {
  InstagramIcon,
  LinkedinIcon,
  XSocialIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Why Gems Future", href: "#why" },
      { label: "Career Guidance", href: "/start" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    title: "For students",
    links: [
      { label: "Start counselling", href: "/start" },
      { label: "FAQ", href: "#" },
    ],
  },
];

const socials = [
  { label: "X", href: "#", Icon: XSocialIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo height={40} />
            <p className="text-sm text-ink-2">
              Free, AI-powered career and course counselling for students across
              India. Honest guidance, affordable options, no pressure.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-ink-2 transition-colors hover:border-primary hover:bg-soft-blue hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon width={18} height={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-ink-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-5 py-5 sm:flex-row sm:items-center sm:px-8">
          <p className="text-xs text-muted">
            © {year} Gems Future. Made for students in India.
          </p>
          <p className="text-xs text-muted">Find the right direction.</p>
        </div>
      </div>
    </footer>
  );
}
