import Link from "next/link";
import type { ReactNode } from "react";

const adminNavGroups = [
  {
    label: "總覽",
    items: [{ href: "/admin/dashboard", label: "Dashboard" }],
  },
  {
    label: "內容管理",
    items: [
      { href: "/admin/homepage", label: "首頁內容" },
      { href: "/admin/birds", label: "鳥類資料" },
      { href: "/admin/posts", label: "導覽日記" },
      { href: "/admin/activities", label: "活動資訊" },
      { href: "/admin/services", label: "服務項目" },
      { href: "/admin/portfolio", label: "作品集" },
      { href: "/admin/gallery", label: "圖片庫" },
    ],
  },
  {
    label: "名單資料",
    items: [
      { href: "/admin/registrations", label: "活動報名" },
      { href: "/admin/subscribers", label: "訂閱名單" },
    ],
  },
  {
    label: "系統",
    items: [
      { href: "/admin/settings", label: "網站設定" },
      { href: "/admin/account", label: "管理員帳號" },
    ],
  },
];

interface AdminShellProps {
  username: string;
  activeHref: string;
  title: string;
  description?: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

export function AdminShell({
  username,
  activeHref,
  title,
  description,
  children,
  headerAction,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#f3f7f2] text-forest-900">
      <div className="content-shell grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="admin-card h-fit p-5 lg:sticky lg:top-6">
          <div className="border-b border-forest-200/70 pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest-600">
              後台 CMS
            </p>
            <p className="mt-3 text-xl font-bold text-forest-900">賞鳥助手管理台</p>
            <p className="mt-2 text-sm text-forest-700/78">登入身份：{username}</p>
          </div>

          <nav className="mt-5 space-y-5">
            {adminNavGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 text-xs font-bold uppercase tracking-[0.14em] text-forest-600/70">
                  {group.label}
                </p>
                <div className="mt-2 space-y-1">
                  {group.items.map((item) => {
                    const active = activeHref === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                          active
                            ? "bg-forest-700 text-white shadow-sm"
                            : "text-forest-800 hover:bg-forest-100"
                        }`}
                      >
                        <span>{item.label}</span>
                        {active ? <span className="text-xs text-white/70">目前</span> : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <form action="/api/auth/logout" method="post" className="mt-6">
            <button
              type="submit"
              className="w-full rounded-lg border border-forest-300 px-4 py-3 text-sm font-semibold text-forest-800 transition hover:border-forest-500"
            >
              登出
            </button>
          </form>
        </aside>

        <main className="space-y-6">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-forest-900">{title}</h1>
              {description ? (
                <p className="mt-3 max-w-2xl text-sm leading-7 text-forest-700/82">{description}</p>
              ) : null}
            </div>
            {headerAction}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
