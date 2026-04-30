"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const adminNavGroups = [
  {
    label: "總覽",
    items: [{ href: "/admin/dashboard", label: "Dashboard" }],
  },
  {
    label: "內容管理",
    items: [
      { href: "/admin/homepage", label: "首頁內容" },
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

  const Sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-forest-200/70 px-5 pb-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-600">
          後台 CMS
        </p>
        <p className="mt-3 text-xl font-bold text-forest-900">賞鳥助手管理台</p>
        <p className="mt-2 text-sm text-forest-700/78">登入身份：{username}</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-5">
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

      <form action="/api/auth/logout" method="post" className="border-t border-forest-200/70 px-4 py-4">
        <button
          type="submit"
          className="w-full rounded-lg border border-forest-300 px-4 py-3 text-sm font-semibold text-forest-800 transition hover:border-forest-500"
        >
          登出
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f7f2] text-forest-900">
      {/* Mobile topbar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-forest-100 bg-white/95 px-4 backdrop-blur lg:hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest-800 text-sm font-bold text-white">
            鳥
          </span>
          <span className="text-sm font-bold text-forest-900">賞鳥助手管理台</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-forest-200 bg-white text-forest-900"
          aria-label="開啟選單"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </header>

      <div className="content-shell grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="admin-card hidden h-fit p-0 lg:sticky lg:top-6 lg:block">
          {Sidebar}
        </aside>

        {/* Mobile drawer */}
        <div className={`lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
          <div
            className={`fixed inset-0 z-40 bg-forest-900/40 backdrop-blur-sm transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />
          <aside
            className={`fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-card transition-transform ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {Sidebar}
          </aside>
        </div>

        <main className="space-y-6">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-forest-900 md:text-3xl">{title}</h1>
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
