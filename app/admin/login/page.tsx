import { redirect } from "next/navigation";

import { MessageBanner } from "@/components/admin/message-banner";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [admin, query] = await Promise.all([getCurrentAdmin(), searchParams]);

  if (admin) {
    redirect("/admin/dashboard");
  }

  const error =
    query.error === "invalid_credentials"
      ? "帳號或密碼不正確。"
      : query.error === "missing_fields"
        ? "請輸入帳號與密碼。"
        : "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-page-glow px-4">
      <div className="w-full max-w-md rounded-lg border border-forest-200 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest-600">
          Admin Login
        </p>
        <h1 className="mt-4 text-3xl font-bold text-forest-900">管理員登入</h1>
        <p className="mt-3 text-sm leading-7 text-forest-700/82">
          使用帳號密碼登入後，即可管理首頁內容、貼文、活動、作品與網站設定。
        </p>

        <div className="mt-6">
          <MessageBanner message={error} tone="error" />
        </div>

        <form action="/api/auth/login" method="post" className="mt-6 space-y-5">
          <div>
            <label className="admin-label" htmlFor="username">
              帳號
            </label>
            <input id="username" name="username" className="admin-input" required />
          </div>
          <div>
            <label className="admin-label" htmlFor="password">
              密碼
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="admin-input"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-800"
          >
            登入後台
          </button>
        </form>
      </div>
    </div>
  );
}
