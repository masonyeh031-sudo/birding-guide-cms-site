import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { FormDirtyIndicator } from "@/components/admin/form-dirty-indicator";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getServices } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const emptyService = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  duration: "",
  price: "",
  image: "",
  features: [],
  sortOrder: 1,
};

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; status?: string }>;
}) {
  const [admin, services, query] = await Promise.all([
    requireAdmin(),
    getServices(),
    searchParams,
  ]);
  const selected = services.find((item) => item.id === query.edit) ?? services[0] ?? emptyService;
  const isNew = query.edit === "new" || !services.length;
  const current = isNew ? emptyService : selected;

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/services"
      title="服務項目管理"
      description="管理服務頁內容，包含服務名稱、費用、時長、圖片與重點條列。"
      headerAction={
        <Link
          href="/admin/services?edit=new"
          className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white"
        >
          新增服務
        </Link>
      }
    >
      <MessageBanner
        message={
          query.status === "saved"
            ? "服務項目已儲存。"
            : query.status === "deleted"
              ? "服務項目已刪除。"
              : ""
        }
      />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="admin-card rounded-lg p-5">
          <h2 className="text-lg font-semibold text-forest-900">服務列表</h2>
          <div className="mt-4 space-y-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/admin/services?edit=${service.id}`}
                className={`block rounded-lg border px-4 py-4 ${
                  current.id === service.id && !isNew
                    ? "border-forest-500 bg-forest-50"
                    : "border-forest-200 hover:border-forest-300"
                }`}
              >
                <p className="font-semibold text-forest-900">{service.title}</p>
                <p className="mt-2 text-sm text-forest-700/78">{service.price}</p>
              </Link>
            ))}
          </div>
        </aside>

        <form
          action="/api/admin/services"
          method="post"
          encType="multipart/form-data"
          className="admin-card rounded-lg p-6"
        >
          <input type="hidden" name="id" value={current.id} />
          <h2 className="text-xl font-semibold text-forest-900">
            {isNew ? "新增服務" : "編輯服務"}
          </h2>
          <div className="mt-5 grid gap-5">
            <div className="grid gap-5 md:grid-cols-[1fr_160px]">
              <div>
                <label className="admin-label">服務名稱</label>
                <input name="title" defaultValue={current.title} className="admin-input" required />
              </div>
              <div>
                <label className="admin-label">排序</label>
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={current.sortOrder}
                  className="admin-input"
                />
              </div>
            </div>
            <div>
              <label className="admin-label">短標</label>
              <input name="subtitle" defaultValue={current.subtitle} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">服務說明</label>
              <textarea
                name="description"
                defaultValue={current.description}
                className="admin-textarea"
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">時長</label>
                <input name="duration" defaultValue={current.duration} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">費用</label>
                <input name="price" defaultValue={current.price} className="admin-input" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">圖片網址</label>
                <input name="image" defaultValue={current.image} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳圖片</label>
                <input name="imageFile" type="file" accept="image/*" className="admin-input" />
              </div>
            </div>
            <div>
              <label className="admin-label">服務重點</label>
              <textarea
                name="features"
                defaultValue={current.features.join("\n")}
                className="admin-textarea"
                placeholder="每行一個重點"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              儲存服務
            </button>
            {!isNew && current.id ? (
              <ConfirmSubmitButton
                formAction={`/api/admin/services/${current.id}`}
                className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                message="確定要刪除此服務嗎？此動作無法復原。"
              >
                刪除服務
              </ConfirmSubmitButton>
            ) : null}
            <FormDirtyIndicator />
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
