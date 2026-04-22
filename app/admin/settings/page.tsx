import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [admin, settings, query] = await Promise.all([
    requireAdmin(),
    getSiteSettings(),
    searchParams,
  ]);

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/settings"
      title="網站設定"
      description="調整網站名稱、Logo、SEO、聯絡資訊與社群連結。Footer 內容也由這裡控制。"
    >
      <MessageBanner message={query.status === "saved" ? "網站設定已更新。" : ""} />

      <form
        action="/api/admin/settings"
        method="post"
        encType="multipart/form-data"
        className="admin-card rounded-lg p-6"
      >
        <div className="grid gap-5">
          <div>
            <label className="admin-label">網站名稱</label>
            <input name="siteName" defaultValue={settings.siteName} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">網站副標</label>
            <input name="tagline" defaultValue={settings.tagline} className="admin-input" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="admin-label">Logo 圖片網址</label>
              <input name="logo" defaultValue={settings.logo} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">上傳新 Logo</label>
              <input name="logoFile" type="file" accept="image/*" className="admin-input" />
            </div>
          </div>
          <div>
            <label className="admin-label">SEO Title</label>
            <input name="seoTitle" defaultValue={settings.seoTitle} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">SEO Description</label>
            <textarea
              name="seoDescription"
              defaultValue={settings.seoDescription}
              className="admin-textarea"
            />
          </div>
          <div>
            <label className="admin-label">聯絡 Email</label>
            <input
              name="contactEmail"
              type="email"
              defaultValue={settings.contactEmail}
              className="admin-input"
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {settings.socialLinks.map((item, index) => (
              <div key={item.label} className="rounded-lg border border-forest-200 p-5">
                <label className="admin-label">社群名稱 {index + 1}</label>
                <input
                  name={`socialLabel-${index}`}
                  defaultValue={item.label}
                  className="admin-input"
                />
                <label className="admin-label mt-4">社群連結 {index + 1}</label>
                <input
                  name={`socialUrl-${index}`}
                  defaultValue={item.url}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="admin-label">Footer 文字</label>
            <textarea name="footerText" defaultValue={settings.footerText} className="admin-textarea" />
          </div>
          <div>
            <label className="admin-label">Footer 底部短句</label>
            <input
              name="footerBottomText"
              defaultValue={settings.footerBottomText}
              className="admin-input"
            />
          </div>
          <div className="grid gap-5">
            <div>
              <h2 className="text-xl font-semibold text-forest-900">次頁文案管理</h2>
              <p className="mt-2 text-sm leading-7 text-forest-700/82">
                導覽日記、活動、服務、作品集與聯絡頁的主標、副標與按鈕也從這裡控制。
              </p>
            </div>

            {([
              ["journal", "導覽日記"],
              ["activities", "活動頁"],
              ["services", "服務頁"],
              ["portfolio", "作品集"],
              ["contact", "聯絡頁"],
            ] as const).map(([key, label]) => (
              <div key={key} className="rounded-lg border border-forest-200 p-5">
                <h3 className="text-lg font-semibold text-forest-900">{label}</h3>
                <div className="mt-4 grid gap-5">
                  <div>
                    <label className="admin-label">Eyebrow</label>
                    <input
                      name={`${key}Eyebrow`}
                      defaultValue={settings.pageContent[key].eyebrow}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="admin-label">主標題</label>
                    <input
                      name={`${key}Title`}
                      defaultValue={settings.pageContent[key].title}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="admin-label">副標題</label>
                    <textarea
                      name={`${key}Subtitle`}
                      defaultValue={settings.pageContent[key].subtitle}
                      className="admin-textarea"
                    />
                  </div>
                  {key === "activities" || key === "services" ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="admin-label">按鈕文字</label>
                        <input
                          name={`${key}ActionLabel`}
                          defaultValue={settings.pageContent[key].actionLabel || ""}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="admin-label">按鈕連結</label>
                        <input
                          name={`${key}ActionHref`}
                          defaultValue={settings.pageContent[key].actionHref || ""}
                          className="admin-input"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存網站設定
        </button>
      </form>
    </AdminShell>
  );
}
