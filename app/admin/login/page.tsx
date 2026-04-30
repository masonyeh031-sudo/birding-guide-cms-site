import { redirect } from "next/navigation";

import { MessageBanner } from "@/components/admin/message-banner";
import { AmbientBackground } from "@/components/site/ambient-background";
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
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-page-glow px-4 py-10">
      <AmbientBackground birds blobs grid />

      <div className="relative w-full max-w-md">
        <div className="glass glow-ring relative p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-forest-800 to-forest-600 text-lg font-bold text-white shadow-glow-soft">
              鳥
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                Admin Console
              </p>
              <p className="text-sm font-semibold text-forest-900">賞鳥人後台</p>
            </div>
          </div>

          <h1 className="mt-7 text-3xl font-bold text-forest-900">管理員登入</h1>
          <p className="mt-3 text-sm leading-7 text-forest-700/82">
            登入後即可管理首頁內容、貼文、活動、作品與網站設定。
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
            <button type="submit" className="btn-primary w-full">
              登入後台 <span aria-hidden>→</span>
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-forest-600">
            City · Forest · Future · Birding
          </p>
        </div>
      </div>
    </div>
  );
}
