"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { SiteSettingsRecord } from "@/lib/types";

const navItems = [
  { label: "主頁", href: "/" },
  { label: "導覽日記", href: "/journal" },
  { label: "都會公園導覽活動", href: "/activities" },
  { label: "看更多觀鳥人作品", href: "/portfolio" },
  { label: "影像紀實", href: "/gallery" },
  { label: "聯絡資訊", href: "/contact" },
];

interface NavbarProps {
  settings: SiteSettingsRecord;
}

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-forest-100/80 bg-white/75 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="content-shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-forest-800 to-forest-600 text-base font-bold text-white shadow-glow-soft transition-transform group-hover:scale-105">
            <span className="relative z-10">鳥</span>
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition group-hover:opacity-100" />
          </span>
          <span className="block text-base font-bold text-forest-900 md:text-lg">
            {settings.siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link rounded-full px-3 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "is-active text-forest-900"
                  : "text-forest-800 hover:text-forest-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/activities" className="btn-primary ml-2 px-4 text-sm">
            我要報名活動
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-forest-200 bg-white/80 text-forest-900 backdrop-blur lg:hidden"
          aria-label="開啟主選單"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div className="shimmer-line opacity-60" />

      <div
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 z-40 bg-forest-900/40 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed inset-x-0 top-16 z-50 origin-top transition ${
            open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0"
          }`}
        >
          <div className="glass mx-3 p-3">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive(item.href)
                      ? "bg-forest-800 text-white shadow-glow-soft"
                      : "text-forest-800 hover:bg-forest-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/activities" className="btn-primary mt-2 flex w-full">
              我要報名活動
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
