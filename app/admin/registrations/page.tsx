import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getRegistrations } from "@/lib/content-store";
import type { RegistrationStatus } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusOptions: Array<{ label: string; value: RegistrationStatus }> = [
  { label: "新報名", value: "new" },
  { label: "已聯絡", value: "contacted" },
  { label: "已確認", value: "confirmed" },
  { label: "已取消", value: "cancelled" },
];

const statusLabels: Record<RegistrationStatus, string> = {
  new: "新報名",
  contacted: "已聯絡",
  confirmed: "已確認",
  cancelled: "已取消",
};

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
              共 {registrations.length} 筆報名，最新送出的資料會排在最上方。
            </p>
          </div>
          <Link
            href="/activities"
            className="w-fit rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white"
          >
            查看前台活動
          </Link>
        </div>

        {registrations.length ? (
          <div className="mt-5 space-y-4">
            {registrations.map((registration) => (
              <article
                key={registration.id}
                className="rounded-lg border border-forest-200 bg-white p-5"
              >
                <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr_260px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                        {statusLabels[registration.status]}
                      </span>
                      <p className="text-sm text-forest-700/70">
                        {formatDateTime(registration.createdAt)}
                      </p>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-forest-900">
                      {registration.activityTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-forest-700/82">
                      {registration.ticketType}
                    </p>
                  </div>

                  <div className="grid gap-2 text-sm leading-7 text-forest-800">
                    <p>
                      <span className="font-semibold">姓名：</span>
                      {registration.name}
                    </p>
                    <p>
                      <span className="font-semibold">Email：</span>
                      {registration.email}
                    </p>
                    <p>
                      <span className="font-semibold">電話：</span>
                      {registration.phone}
                    </p>
                    <p>
                      <span className="font-semibold">人數：</span>
                      {registration.participants}
                    </p>
                    {registration.companionNames ? (
                      <p>
                        <span className="font-semibold">同行者：</span>
                        {registration.companionNames}
                      </p>
                    ) : null}
                  </div>

                  <form
                    action={`/api/admin/registrations/${registration.id}`}
                    method="post"
                    className="space-y-3"
                  >
                    <div>
                      <label className="admin-label">處理狀態</label>
                      <select
                        name="status"
                        defaultValue={registration.status}
                        className="admin-select"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button className="w-full rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
                      更新狀態
                    </button>
                    <button
                      name="intent"
                      value="delete"
                      className="w-full rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
                    >
                      刪除
                    </button>
                  </form>
                </div>

                {(registration.experience || registration.source || registration.needs) ? (
                  <div className="mt-5 grid gap-3 rounded-lg bg-forest-50 p-4 text-sm leading-7 text-forest-700 md:grid-cols-3">
                    {registration.experience ? <p>經驗：{registration.experience}</p> : null}
                    {registration.source ? <p>來源：{registration.source}</p> : null}
                    {registration.needs ? <p className="md:col-span-3">備註：{registration.needs}</p> : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-forest-200 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-forest-900">目前還沒有報名資料</p>
            <p className="mt-2 text-sm text-forest-700/78">
              前台活動詳情頁送出表單後，資料會出現在這裡。
            </p>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
