import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { FormDirtyIndicator } from "@/components/admin/form-dirty-indicator";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getActivities } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const emptyActivity = {
  id: "",
  title: "",
  date: "",
  time: "",
  location: "",
  meetingPoint: "",
  duration: "",
  price: "",
  description: "",
  schedule: [],
  highlights: [],
  notices: [],
  image: "",
  images: [],
  registerUrl: "",
};

export default async function AdminActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; status?: string }>;
}) {
  const [admin, activities, query] = await Promise.all([
    requireAdmin(),
    getActivities(),
    searchParams,
  ]);
  const selected = activities.find((item) => item.id === query.edit) ?? activities[0] ?? emptyActivity;
  const isNew = query.edit === "new" || !activities.length;
  const current = isNew ? emptyActivity : selected;

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/activities"
      title="活動管理"
      description="管理都會公園導覽活動，包含時間、地點、費用、活動流程、注意事項與報名頁內容。"
      headerAction={
        <Link href="/admin/activities?edit=new" className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
          新增活動
        </Link>
      }
    >
      <MessageBanner message={query.status === "saved" ? "活動已儲存。" : query.status === "deleted" ? "活動已刪除。" : ""} />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="admin-card rounded-lg p-5">
          <h2 className="text-lg font-semibold text-forest-900">活動列表</h2>
          <div className="mt-4 space-y-3">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/admin/activities?edit=${activity.id}`}
                className={`block rounded-lg border px-4 py-4 ${
                  current.id === activity.id && !isNew
                    ? "border-forest-500 bg-forest-50"
                    : "border-forest-200 hover:border-forest-300"
                }`}
              >
                <p className="text-sm text-forest-700/78">{activity.date}</p>
                <p className="mt-2 font-semibold text-forest-900">{activity.title}</p>
                <p className="mt-2 text-sm text-forest-700/78">{activity.location}</p>
              </Link>
            ))}
          </div>
        </aside>

        <form
          action="/api/admin/activities"
          method="post"
          encType="multipart/form-data"
          className="admin-card rounded-lg p-6"
        >
          <input type="hidden" name="id" value={current.id} />
          <h2 className="text-xl font-semibold text-forest-900">{isNew ? "新增活動" : "編輯活動"}</h2>
          <div className="mt-5 grid gap-7">
            <section className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">基本資訊</h3>
              <div className="mt-5 grid gap-5">
            <div>
              <label className="admin-label">活動名稱</label>
              <input name="title" defaultValue={current.title} className="admin-input" required />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="admin-label">日期</label>
                <input name="date" type="date" defaultValue={current.date} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">時間</label>
                <input name="time" defaultValue={current.time} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">地點</label>
                <input name="location" defaultValue={current.location} className="admin-input" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="admin-label">集合點</label>
                <input name="meetingPoint" defaultValue={current.meetingPoint} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">活動時長</label>
                <input name="duration" defaultValue={current.duration} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">費用</label>
                <input name="price" defaultValue={current.price} className="admin-input" />
              </div>
            </div>
            <div>
              <label className="admin-label">活動介紹</label>
              <textarea name="description" defaultValue={current.description} className="admin-textarea" />
            </div>
              </div>
            </section>

            <section className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">活動照片</h3>
              <p className="mt-2 text-sm text-forest-700/78">
                可上傳多張照片，前台活動頁與詳情頁會自動輪播。
              </p>
              <div className="mt-5 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">圖片網址</label>
                <input name="image" defaultValue={current.image} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳活動照片（可多選）</label>
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
              </div>
            </section>

            <section className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">報名頁內容</h3>
              <div className="mt-5 grid gap-5">
                <div>
                  <label className="admin-label">活動流程</label>
                  <textarea
                    name="schedule"
                    defaultValue={current.schedule?.join("\n") || ""}
                    className="admin-textarea"
                    placeholder="每行一個流程，例如：14:30 集合"
                  />
                </div>
                <div>
                  <label className="admin-label">活動亮點</label>
                  <textarea
                    name="highlights"
                    defaultValue={current.highlights?.join("\n") || ""}
                    className="admin-textarea"
                    placeholder="每行一個亮點"
                  />
                </div>
                <div>
                  <label className="admin-label">注意事項</label>
                  <textarea
                    name="notices"
                    defaultValue={current.notices?.join("\n") || ""}
                    className="admin-textarea"
                    placeholder="每行一個注意事項"
                  />
                </div>
            <div>
              <label className="admin-label">自訂報名連結</label>
              <input name="registerUrl" defaultValue={current.registerUrl} className="admin-input" />
              <p className="mt-2 text-sm text-forest-700/72">
                內建報名頁會自動使用 /activities/{current.id || "活動 ID"}，這裡可保留外部備用連結。
              </p>
            </div>
              </div>
            </section>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              儲存活動
            </button>
            {!isNew && current.id ? (
              <ConfirmSubmitButton
                formAction={`/api/admin/activities/${current.id}`}
                className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                message="確定要刪除此活動嗎？此動作無法復原。"
              >
                刪除活動
              </ConfirmSubmitButton>
            ) : null}
            <FormDirtyIndicator />
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
