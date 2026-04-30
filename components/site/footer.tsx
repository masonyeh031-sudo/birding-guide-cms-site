import Link from "next/link";

import type { SiteSettingsRecord } from "@/lib/types";

interface FooterProps {
  settings: SiteSettingsRecord;
}

const footerNav = [
  { href: "/activities", label: "賞鳥活動" },
  { href: "/journal", label: "導覽日記" },
  { href: "/portfolio", label: "作品集" },
  { href: "/gallery", label: "影像紀實" },
  { href: "/contact", label: "聯絡我們" },
];

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-16 border-t border-forest-100 bg-white">
      <div className="content-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-forest-800 text-lg font-bold text-white">
              鳥
            </span>
            <span className="text-lg font-bold text-forest-900">{settings.siteName}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-forest-700">
            {settings.footerText || settings.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-600">
            探索網站
          </p>
          <ul className="mt-4 grid gap-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-forest-800 transition hover:text-forest-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-600">
            聯絡資訊
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-forest-800">
            <li>
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-forest-900">
                {settings.contactEmail}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {settings.socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-forest-200 px-3 py-1.5 text-xs font-semibold text-forest-800 hover:border-forest-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-forest-100">
        <div className="content-shell flex flex-col gap-2 py-5 text-xs text-forest-700 md:flex-row md:items-center md:justify-between">
          <p>© {year} {settings.siteName}．保留所有權利</p>
          <div className="flex items-center gap-4">
            {settings.footerBottomText ? <span>{settings.footerBottomText}</span> : null}
            <Link href="/admin/login" className="text-forest-500 hover:text-forest-700">
              後台登入
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
