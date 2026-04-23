import Link from "next/link";

import type { SiteSettingsRecord } from "@/lib/types";

const navItems = [
  { label: "主頁", href: "/" },
  { label: "導覽日記", href: "/journal" },
  { label: "都會公園導覽活動", href: "/activities" },
  { label: "服務項目", href: "/services" },
  { label: "看更多觀鳥人作品", href: "/portfolio" },
  { label: "聯絡我", href: "/contact" },
];

interface NavbarProps {
  settings: SiteSettingsRecord;
}

export function Navbar({ settings }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-carbon-950/78 backdrop-blur-xl">
      <div className="content-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-white/12 bg-white/6">
              <img
                src={settings.logo}
                alt={`${settings.siteName} Logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-mist">{settings.siteName}</p>
              <p className="text-sm text-white/56">{settings.tagline}</p>
            </div>
          </Link>

          <Link
            href="/activities#activity-list"
            className="site-button-primary lg:hidden"
          >
            查看活動
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-white/76 lg:justify-end">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 transition hover:bg-white/6 hover:text-mist"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/activities#activity-list" className="site-button-primary lg:ml-2">
            立即報名
          </Link>
        </div>
      </div>
    </header>
  );
}
