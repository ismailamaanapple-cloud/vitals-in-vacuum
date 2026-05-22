"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MODULES } from "@/lib/modules";

const TABS = [
  { label: "Modules", href: "/#modules" },
  { label: "Mission", href: "/#timeline" },
  { label: "Resources", href: "/#resources" },
  { label: "FAQ", href: "/#faq" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 sm:px-7 py-4 transition-all duration-500 ${
            scrolled ? "glass-nav" : "bg-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan to-plasma opacity-80 blur-[8px] transition-opacity group-hover:opacity-100" />
              <span className="relative h-5 w-5 rounded-full bg-ink" />
              <span className="absolute h-10 w-10 rounded-full border border-ink/30" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Vitals<span className="text-mute">in</span>Vacuum
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 md:flex">
            {TABS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-lg px-3.5 py-2 text-[15px] text-mute transition-colors hover:text-ink"
              >
                {t.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#modules"
            className="hidden rounded-lg bg-ink px-5 py-2.5 text-[15px] font-medium text-void transition-transform hover:scale-105 md:inline-block"
          >
            Start learning
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg glass md:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {open && (
          <div className="mt-2 grid gap-1 rounded-2xl glass-nav p-3 md:hidden">
            {TABS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-haze/40"
              >
                {t.label}
              </Link>
            ))}
            <div className="my-2 px-3 text-[11px] font-medium uppercase tracking-widest text-faint">
              All modules
            </div>
            {MODULES.map((m) => (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                className="rounded-lg px-3 py-2.5 text-base text-mute hover:bg-haze/40 hover:text-ink"
              >
                <span className="font-mono text-faint mr-2">{m.index}</span>
                {m.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
