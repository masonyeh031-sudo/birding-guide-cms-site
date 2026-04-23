import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";
import {
  getActivities,
  getBirds,
  getGalleryItems,
  getPortfolioItems,
  getPosts,
  getRegistrations,
  getServices,
  getSubscribers,
} from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const [posts, activities, birds, services, portfolioItems, galleryItems, registrations, subscribers] =
    await Promise.all([
      getPosts(),
      getActivities(),
      getBirds(),
      getServices(),
      getPortfolioItems(),
      getGalleryItems(),
      getRegistrations(),
      getSubscribers(),
    ]);

  const stats = [
    { label: "導覽日記", value: posts.length.toString(), href: "/admin/posts" },
    { label: "活動場次", value: activities.length.toString(), href: "/admin/activities" },
    { label: "鳥類資料", value: birds.length.toString(), href: "/admin/birds" },
    { label: "服務項目", value: services.length.toString(), href: "/admin/services" },
    { label: "活動報名", value: registrations.length.toString(), href: "/admin/registrations" },
    { label: "作品項目", value: portfolioItems.length.toString(), href: "/admin/portfolio" },
    { label: "Gallery 圖片", value: galleryItems.length.toString(), href: "/admin/gallery" },
    { label: "訂閱名單", value: subscribers.length.toString(), href: "/admin/subscribers" },
  ];

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/dashboard"
      title="Dashboard 首頁"
      description="從這裡快速掌握前台內容規模，並前往各模組進行編輯。"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="admin-card rounded-lg p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-sm text-forest-700/78">{item.label}</p>
            <p className="mt-4 text-4xl font-bold text-forest-900">{item.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="admin-card rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest-900">目前建議先檢查</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-forest-700/84">
            <li>首頁 Hero 與最新消息是否和近期導覽內容一致。</li>
            <li>導覽日記是否有草稿待發佈。</li>
            <li>活動頁日期、集合點、費用與報名表單是否正確。</li>
            <li>新報名資料是否需要聯絡或確認。</li>
            <li>訂閱名單是否需要匯出給活動通知使用。</li>
          </ul>
        </section>

        <section className="admin-card rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest-900">快速入口</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/admin/homepage" className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
              編輯首頁
            </Link>
            <Link href="/admin/birds" className="rounded-lg border border-forest-300 px-4 py-3 text-sm font-semibold text-forest-800">
              管理鳥類資料
            </Link>
            <Link href="/admin/posts" className="rounded-lg border border-forest-300 px-4 py-3 text-sm font-semibold text-forest-800">
              新增貼文
            </Link>
            <Link href="/admin/activities" className="rounded-lg border border-forest-300 px-4 py-3 text-sm font-semibold text-forest-800">
              管理活動
            </Link>
            <Link href="/admin/registrations" className="rounded-lg border border-forest-300 px-4 py-3 text-sm font-semibold text-forest-800">
              查看報名
            </Link>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
