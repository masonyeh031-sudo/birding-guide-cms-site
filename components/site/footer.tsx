import Link from "next/link";

import type { SiteSettingsRecord } from "@/lib/types";

interface FooterProps {
  settings: SiteSettingsRecord;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-carbon-950 text-white">
      <div className="content-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xl font-semibold text-mist">{settings.siteName}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/62">{settings.footerText}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">
            聯絡資訊
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>Email</p>
            <Link href={`mailto:${settings.contactEmail}`} className="block hover:text-mist">
              {settings.contactEmail}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">
            社群連結
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/72">
            {settings.socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/12 px-3 py-2 transition hover:border-white/28 hover:text-mist"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="content-shell flex flex-col gap-2 py-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {settings.siteName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <p>{settings.footerBottomText}</p>
            <Link
              href="/admin/login"
              className="text-xs text-white/36 transition hover:text-white/70"
            >
              後台登入
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
