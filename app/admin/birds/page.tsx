import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getBirds } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const emptyBird = {
  id: "",
  name: "",
  englishName: "",
  image: "",
  galleryImages: [],
  description: "",
  detailedDescription: "",
  habitat: [],
  category: "",
  observationPoint: "",
  sourceText: "",
  tags: [],
  createdAt: "",
  updatedAt: "",
};

export default async function AdminBirdsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; status?: string }>;
}) {
  const [admin, birds, query] = await Promise.all([
    requireAdmin(),
    getBirds(),
    searchParams,
  ]);
  const selected = birds.find((bird) => bird.id === query.edit) ?? birds[0] ?? emptyBird;
  const isNew = query.edit === "new" || !birds.length;
  const current = isNew ? emptyBird : selected;

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/birds"
      title="鳥類資料管理"
      description="管理首頁鳥類資料庫，包含鳥名、英文名、棲地、分類、圖片、詳細說明與原站文字來源。"
      headerAction={
        <Link href="/admin/birds?edit=new" className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
          新增鳥類
        </Link>
      }
    >
      <MessageBanner message={query.status === "saved" ? "鳥類資料已儲存。" : query.status === "deleted" ? "鳥類資料已刪除。" : ""} />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="admin-card rounded-lg p-5">
          <h2 className="text-lg font-semibold text-forest-900">鳥類列表</h2>
          <p className="mt-2 text-sm text-forest-700/78">目前 {birds.length} 筆資料。</p>
          <div className="mt-4 space-y-3">
            {birds.map((bird) => (
              <Link
                key={bird.id}
                href={`/admin/birds?edit=${bird.id}`}
                className={`block rounded-lg border px-4 py-4 ${
                  current.id === bird.id && !isNew
                    ? "border-forest-500 bg-forest-50"
                    : "border-forest-200 hover:border-forest-300"
                }`}
              >
                <p className="font-semibold text-forest-900">{bird.name}</p>
                <p className="mt-1 text-sm text-forest-600">{bird.englishName}</p>
                <p className="mt-2 text-xs font-semibold text-forest-700/70">{bird.category}</p>
              </Link>
            ))}
          </div>
        </aside>

        <form
          action="/api/admin/birds"
          method="post"
          encType="multipart/form-data"
          className="admin-card rounded-lg p-6"
        >
          <input type="hidden" name="id" value={current.id} />
          <h2 className="text-xl font-semibold text-forest-900">{isNew ? "新增鳥類" : "編輯鳥類"}</h2>

          <div className="mt-5 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">中文鳥名</label>
                <input name="name" defaultValue={current.name} className="admin-input" required />
              </div>
              <div>
                <label className="admin-label">英文鳥名</label>
                <input name="englishName" defaultValue={current.englishName} className="admin-input" required />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">分類</label>
                <input name="category" defaultValue={current.category} className="admin-input" placeholder="都市常見鳥" required />
              </div>
              <div>
                <label className="admin-label">觀察地點</label>
                <input name="observationPoint" defaultValue={current.observationPoint} className="admin-input" />
              </div>
            </div>

            <div>
              <label className="admin-label">棲地（可用逗號或換行分隔）</label>
              <input name="habitat" defaultValue={current.habitat.join(", ")} className="admin-input" placeholder="都市, 濕地" />
            </div>

            <div>
              <label className="admin-label">簡短介紹</label>
              <textarea name="description" defaultValue={current.description} className="admin-textarea" required />
            </div>

            <div>
              <label className="admin-label">詳細資訊</label>
              <textarea name="detailedDescription" defaultValue={current.detailedDescription} className="admin-textarea" />
            </div>

            <div>
              <label className="admin-label">原站文字來源 / 備註</label>
              <textarea name="sourceText" defaultValue={current.sourceText} className="admin-textarea" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">主圖網址</label>
                <input name="image" defaultValue={current.image} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳圖片（可多選）</label>
                <input name="imageFiles" type="file" accept="image/*" multiple className="admin-input" />
              </div>
            </div>

            <div>
              <label className="admin-label">詳細輪播圖片網址</label>
              <textarea
                name="galleryImages"
                defaultValue={current.galleryImages.join("\n")}
                className="admin-textarea"
                placeholder="每行一張圖片網址"
              />
            </div>

            <div>
              <label className="admin-label">標籤（可用逗號或換行分隔）</label>
              <input name="tags" defaultValue={current.tags.join(", ")} className="admin-input" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              儲存鳥類
            </button>
            {!isNew && current.id ? (
              <button
                formAction={`/api/admin/birds/${current.id}`}
                className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600"
              >
                刪除鳥類
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
