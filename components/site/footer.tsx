import Link from "next/link";

import type { SiteSettingsRecord } from "@/lib/types";

interface FooterProps {
  settings: SiteSettingsRecord;
}

// 原 Wix 站 Footer 樣式（白底、森林綠文字）
export function Footer({ settings }: FooterProps) {
  return (
    <footer id="contact" className="bg-white border-t border-forest-100">
      <div className="content-shell flex flex-col gap-4 py-8 text-sm text-forest-700 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-forest-900">{settings.siteName}</p>
          <p className="mt-2">聯絡資訊 {settings.contactEmail}</p>
          {settings.footerText ? <p className="mt-1">{settings.footerText}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-forest-900">
            Email
          </a>
          {settings.socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-forest-100 px-3 py-2 text-forest-800 hover:border-forest-300"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/admin/login" className="text-xs text-forest-500">
            後台登入
          </Link>
          <p>{settings.footerBottomText}</p>
        </div>
      </div>
    </footer>
  );
}
