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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/92 backdrop-blur-xl">
      <div className="content-shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-forest-800 text-base font-bold text-white">
            鳥
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
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-forest-800 text-white"
                  : "text-forest-800 hover:bg-forest-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/activities"
            className="ml-1 rounded-lg bg-forest-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
          >
            我要報名活動
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-forest-200 bg-white text-forest-900 lg:hidden"
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
          <div className="mx-3 rounded-lg border border-forest-100 bg-white p-3 shadow-card">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-3 text-base font-semibold transition ${
                    isActive(item.href)
                      ? "bg-forest-800 text-white"
                      : "text-forest-800 hover:bg-forest-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/activities"
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-forest-800 px-4 py-3 text-sm font-semibold text-white"
            >
              我要報名活動
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
