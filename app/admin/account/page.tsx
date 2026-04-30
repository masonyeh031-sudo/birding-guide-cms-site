import { AdminShell } from "@/components/admin/admin-shell";
import { FormDirtyIndicator } from "@/components/admin/form-dirty-indicator";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  const [admin, query] = await Promise.all([requireAdmin(), searchParams]);

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/account"
      title="管理員帳號設定"
      description="可更新管理員帳號與密碼。更新密碼時需輸入目前密碼。"
    >
      <MessageBanner
        message={
          query.status === "saved"
            ? "帳號設定已更新。"
            : query.error === "invalid_password"
              ? "目前密碼不正確。"
              : ""
        }
        tone={query.error ? "error" : "success"}
      />

      <form action="/api/admin/account" method="post" className="admin-card rounded-lg p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="admin-label">帳號名稱</label>
            <input name="username" defaultValue={admin.username} className="admin-input" required />
          </div>
          <div>
            <label className="admin-label">目前密碼</label>
            <input name="currentPassword" type="password" className="admin-input" required />
          </div>
          <div>
            <label className="admin-label">新密碼（可留空）</label>
            <input name="nextPassword" type="password" className="admin-input" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
            儲存帳號設定
          </button>
          <FormDirtyIndicator />
        </div>
      </form>
    </AdminShell>
  );
}
