import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getGalleryItems, getMediaLibrary } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [admin, galleryItems, mediaLibrary, query] = await Promise.all([
    requireAdmin(),
    getGalleryItems(),
    getMediaLibrary(),
    searchParams,
  ]);

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/gallery"
      title="圖片庫管理"
      description="統一管理上傳圖片與首頁 Gallery 照片，可新增、刪除、替換或調整排序。"
    >
      <MessageBanner
        message={
          query.status === "saved"
            ? "圖片內容已更新。"
            : query.status === "deleted"
              ? "圖片已刪除。"
              : ""
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="admin-card rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest-900">首頁 Gallery 圖片</h2>
          <form
            action="/api/admin/gallery"
            method="post"
            encType="multipart/form-data"
            className="mt-6 grid gap-5 rounded-lg border border-forest-200 p-5"
          >
            <input type="hidden" name="intent" value="gallery-save" />
            <div>
              <label className="admin-label">Caption</label>
              <input name="caption" className="admin-input" required />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">圖片網址</label>
                <input name="image" className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳圖片（可多選）</label>
                <input name="imageFiles" type="file" accept="image/*" multiple className="admin-input" />
              </div>
            </div>
            <div>
              <label className="admin-label">排序</label>
              <input name="sortOrder" type="number" defaultValue="99" className="admin-input" />
            </div>
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              新增 Gallery 圖片
            </button>
          </form>

          <div className="mt-6 space-y-4">
            {galleryItems.map((item) => (
              <form
                key={item.id}
                action="/api/admin/gallery"
                method="post"
                encType="multipart/form-data"
                className="rounded-lg border border-forest-200 p-4"
              >
                <input type="hidden" name="intent" value="gallery-save" />
                <input type="hidden" name="id" value={item.id} />
                <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-forest-200">
                    <img src={item.image} alt={item.caption} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="admin-label">圖片網址</label>
                      <input name="image" defaultValue={item.image} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">替換圖片</label>
                      <input name="imageFile" type="file" accept="image/*" className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Caption</label>
                      <textarea name="caption" defaultValue={item.caption} className="admin-textarea" />
                    </div>
                    <div>
                      <label className="admin-label">排序</label>
                      <input name="sortOrder" type="number" defaultValue={item.sortOrder} className="admin-input" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
                        儲存
                      </button>
                      <button
                        formAction={`/api/admin/gallery/${item.id}?type=gallery`}
                        className="rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </section>

        <section className="admin-card rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest-900">媒體庫</h2>
          <form
            action="/api/admin/gallery"
            method="post"
            encType="multipart/form-data"
            className="mt-6 grid gap-5 rounded-lg border border-forest-200 p-5"
          >
            <input type="hidden" name="intent" value="media-upload" />
            <div>
              <label className="admin-label">媒體名稱</label>
              <input name="label" className="admin-input" required />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">圖片網址</label>
                <input name="url" className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳圖片（可多選）</label>
                <input name="files" type="file" accept="image/*" multiple className="admin-input" />
              </div>
            </div>
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              加入媒體庫
            </button>
          </form>

          <div className="mt-6 space-y-4">
            {mediaLibrary.map((item) => (
              <form
                key={item.id}
                action="/api/admin/gallery"
                method="post"
                encType="multipart/form-data"
                className="rounded-lg border border-forest-200 p-4"
              >
                <input type="hidden" name="intent" value="media-save" />
                <input type="hidden" name="id" value={item.id} />
                <div className="grid gap-4 md:grid-cols-[110px_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-forest-200">
                    <img src={item.url} alt={item.label} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="admin-label">媒體名稱</label>
                      <input name="label" defaultValue={item.label} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">圖片網址</label>
                      <input name="url" defaultValue={item.url} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">替換圖片</label>
                      <input name="file" type="file" accept="image/*" className="admin-input" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
                        儲存媒體
                      </button>
                      <button className="rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600">
                        刪除媒體
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
