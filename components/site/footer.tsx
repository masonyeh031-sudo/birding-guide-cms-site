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
    <footer
      id="contact"
      className="relative mt-16 overflow-hidden border-t border-forest-100 bg-gradient-to-b from-white to-forest-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-site-grid [background-size:48px_48px] opacity-[0.12]"
      />
      <div className="shimmer-line absolute inset-x-0 top-0" />

      <div className="content-shell relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-forest-800 to-forest-600 text-lg font-bold text-white shadow-glow-soft">
              鳥
            </span>
            <span className="text-xl font-bold text-forest-900">
              {settings.siteName}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-forest-700">
            {settings.footerText || settings.tagline}
          </p>
          <p className="mt-4 max-w-md text-xs leading-6 text-forest-600">
            走進城市與森林之間，重新發現鳥類的世界。
            透過賞鳥活動、自然教育與影像紀錄，
            和你一起以新的方式認識台灣的生態。
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-600">
            探索網站
          </p>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-forest-800 transition hover:text-forest-900"
                >
                  <span className="h-1 w-1 rounded-full bg-forest-400 transition group-hover:w-3 group-hover:bg-signal" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-600">
            聯絡與追蹤
          </p>
          <ul className="mt-5 space-y-2.5 text-sm leading-7 text-forest-800">
            <li>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="transition hover:text-forest-900"
              >
                ✉ {settings.contactEmail}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {settings.socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-forest-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-forest-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-forest-400 hover:text-forest-900 hover:shadow-glow-soft"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-forest-100">
        <div className="content-shell flex flex-col gap-2 py-5 text-xs text-forest-700 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.siteName}．保留所有權利
          </p>
          <div className="flex items-center gap-4">
            {settings.footerBottomText ? (
              <span>{settings.footerBottomText}</span>
            ) : null}
            <Link
              href="/admin/login"
              className="text-forest-500 transition hover:text-forest-700"
            >
              後台登入
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
