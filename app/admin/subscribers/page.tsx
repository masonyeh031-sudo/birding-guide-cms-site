import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { getSubscribers } from "@/lib/content-store";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const [admin, subscribers] = await Promise.all([requireAdmin(), getSubscribers()]);

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/subscribers"
      title="訂閱名單"
      description="查看所有訂閱者 Email，並匯出 CSV 名單。"
      headerAction={
        <Link
          href="/api/admin/subscribers/export"
          className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white"
        >
          匯出 CSV
        </Link>
      }
    >
      <section className="admin-card rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-forest-200 text-forest-700/78">
                <th className="px-3 py-3 font-semibold">Email</th>
                <th className="px-3 py-3 font-semibold">訂閱時間</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-forest-100">
                  <td className="px-3 py-4 text-forest-900">{subscriber.email}</td>
                  <td className="px-3 py-4 text-forest-700/80">
                    {formatDateTime(subscriber.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
