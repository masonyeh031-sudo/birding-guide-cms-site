import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { RegistrationsBoard } from "@/components/admin/registrations-board";
import { requireAdmin } from "@/lib/auth";
import { getRegistrations } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [admin, registrations, query] = await Promise.all([
    requireAdmin(),
    getRegistrations(),
    searchParams,
  ]);

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/registrations"
      title="報名資訊"
      description="查看前台活動報名表單送出的資料，並管理後續聯絡與確認狀態。"
      headerAction={
        <Link
          href="/api/admin/registrations/export"
          className="rounded-lg border border-forest-300 bg-white px-4 py-3 text-sm font-semibold text-forest-800"
        >
          匯出 CSV
        </Link>
      }
    >
      <MessageBanner
        message={
          query.status === "saved"
            ? "報名狀態已更新。"
            : query.status === "deleted"
              ? "報名資料已刪除。"
              : ""
        }
      />

      <section className="admin-card rounded-lg p-6">
        <div className="flex flex-col gap-3 border-b border-forest-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-forest-900">報名列表</h2>
            <p className="mt-2 text-sm text-forest-700/78">
              共 {registrations.length} 筆報名，最新送出的資料會排在最上方。可用上方的搜尋 / 狀態 / 活動進行篩選。
            </p>
          </div>
          <Link
            href="/activities"
            className="w-fit rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white"
          >
            查看前台活動
          </Link>
        </div>
        <div className="mt-5">
          <RegistrationsBoard registrations={registrations} />
        </div>
      </section>
    </AdminShell>
  );
}
