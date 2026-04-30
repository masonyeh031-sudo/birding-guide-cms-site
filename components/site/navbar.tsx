import Link from "next/link";

import type { SiteSettingsRecord } from "@/lib/types";

// 原 Wix 站導覽列樣式（淺色背景、森林綠文字）
const navItems = [
  { label: "主頁", href: "/" },
  { label: "導覽日記", href: "/journal" },
  { label: "都會公園導覽活動", href: "/activities" },
  { label: "看更多觀鳥人作品", href: "/portfolio" },
  { label: "聯絡資訊", href: "/contact" },
];

interface NavbarProps {
  settings: SiteSettingsRecord;
}

export function Navbar({ settings }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/92 backdrop-blur-xl">
      <div className="content-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-forest-800 text-lg font-bold text-white">
            鳥
          </span>
          <span className="block text-xl font-bold text-forest-900">{settings.siteName}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-forest-800">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 hover:bg-forest-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/activities"
            className="rounded-lg bg-forest-800 px-4 py-2.5 text-white hover:bg-forest-700"
          >
            我要報名活動
          </Link>
        </nav>
      </div>
    </header>
  );
}
