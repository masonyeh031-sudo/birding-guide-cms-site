import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { FormDirtyIndicator } from "@/components/admin/form-dirty-indicator";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getPortfolioItems } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const emptyPortfolio = {
  id: "",
  title: "",
  image: "",
  images: [],
  description: "",
  link: "",
};

export default async function AdminPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; status?: string }>;
}) {
  const [admin, items, query] = await Promise.all([
    requireAdmin(),
    getPortfolioItems(),
    searchParams,
  ]);
  const selected = items.find((item) => item.id === query.edit) ?? items[0] ?? emptyPortfolio;
  const isNew = query.edit === "new" || !items.length;
  const current = isNew ? emptyPortfolio : selected;

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/portfolio"
      title="作品集管理"
      description="管理照片作品、影片與導覽成果圖卡。"
      headerAction={
        <Link href="/admin/portfolio?edit=new" className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
          新增作品
        </Link>
      }
    >
      <MessageBanner message={query.status === "saved" ? "作品已儲存。" : query.status === "deleted" ? "作品已刪除。" : ""} />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="admin-card rounded-lg p-5">
          <h2 className="text-lg font-semibold text-forest-900">作品列表</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/admin/portfolio?edit=${item.id}`}
                className={`block rounded-lg border px-4 py-4 ${
                  current.id === item.id && !isNew
                    ? "border-forest-500 bg-forest-50"
                    : "border-forest-200 hover:border-forest-300"
                }`}
              >
                <p className="font-semibold text-forest-900">{item.title}</p>
                <p className="mt-2 text-sm text-forest-700/78">{item.description}</p>
              </Link>
            ))}
          </div>
        </aside>

        <form
          action="/api/admin/portfolio"
          method="post"
          encType="multipart/form-data"
          className="admin-card rounded-lg p-6"
        >
          <input type="hidden" name="id" value={current.id} />
          <h2 className="text-xl font-semibold text-forest-900">{isNew ? "新增作品" : "編輯作品"}</h2>
          <div className="mt-5 grid gap-5">
            <div>
              <label className="admin-label">作品標題</label>
              <input name="title" defaultValue={current.title} className="admin-input" required />
            </div>
            <div>
              <label className="admin-label">作品說明</label>
              <textarea name="description" defaultValue={current.description} className="admin-textarea" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">圖片網址</label>
                <input name="image" defaultValue={current.image} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳作品圖（可多選）</label>
                <input name="imageFiles" type="file" accept="image/*" multiple className="admin-input" />
              </div>
            </div>
            <div>
              <label className="admin-label">輪播圖片網址</label>
              <textarea
                name="images"
                defaultValue={current.images?.join("\n") || ""}
                className="admin-textarea"
                placeholder="每行一張圖片網址"
              />
            </div>
            <div>
              <label className="admin-label">外部連結</label>
              <input name="link" defaultValue={current.link} className="admin-input" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              儲存作品
            </button>
            {!isNew && current.id ? (
              <ConfirmSubmitButton
                formAction={`/api/admin/portfolio/${current.id}`}
                className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                message="確定要刪除此作品嗎？此動作無法復原。"
              >
                刪除作品
              </ConfirmSubmitButton>
            ) : null}
            <FormDirtyIndicator />
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
