import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { requireAdmin } from "@/lib/auth";
import { getHomepageSectionMap } from "@/lib/content-store";
import type {
  FlowItem,
  NewsItem,
  SeriesItem,
  ShowcaseImage,
  StatItem,
} from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [admin, sections, query] = await Promise.all([
    requireAdmin(),
    getHomepageSectionMap(),
    searchParams,
  ]);

  const newsItems = (sections.news.extraJson.items || []) as NewsItem[];
  const statItems = (sections.stats.extraJson.items || []) as StatItem[];
  const flowItems = (sections.flow.extraJson.items || []) as FlowItem[];
  const showcaseImages = (sections.showcase.extraJson.images || []) as ShowcaseImage[];
  const seriesItems = (sections.series.extraJson.items || []) as SeriesItem[];

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/homepage"
      title="首頁內容管理"
      description="首頁所有前台文案與圖片都從這裡更新。上傳新圖時，系統會優先使用上傳檔案；若留空則沿用圖片網址。"
    >
      <MessageBanner message={query.status === "saved" ? "首頁內容已更新。" : ""} />

      <form
        action="/api/admin/homepage"
        method="post"
        encType="multipart/form-data"
        className="admin-card rounded-lg p-6"
      >
        <input type="hidden" name="sectionKey" value="hero" />
        <h2 className="text-xl font-semibold text-forest-900">Hero 主視覺</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="admin-label">大標題</label>
            <input name="title" defaultValue={sections.hero.title} className="admin-input" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">副標題</label>
            <textarea name="subtitle" defaultValue={sections.hero.subtitle} className="admin-textarea" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">補充文字</label>
            <textarea name="content" defaultValue={sections.hero.content} className="admin-textarea" />
          </div>
          <div>
            <label className="admin-label">主按鈕文字</label>
            <input
              name="primaryButtonLabel"
              defaultValue={(sections.hero.extraJson.primaryButtonLabel as string) || ""}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">主按鈕連結</label>
            <input
              name="primaryButtonHref"
              defaultValue={(sections.hero.extraJson.primaryButtonHref as string) || ""}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">次按鈕文字</label>
            <input
              name="secondaryButtonLabel"
              defaultValue={(sections.hero.extraJson.secondaryButtonLabel as string) || ""}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">次按鈕連結</label>
            <input
              name="secondaryButtonHref"
              defaultValue={(sections.hero.extraJson.secondaryButtonHref as string) || ""}
              className="admin-input"
            />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">圖片網址</label>
            <input name="image" defaultValue={sections.hero.image} className="admin-input" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">上傳新圖片</label>
            <input name="imageFile" type="file" accept="image/*" className="admin-input" />
          </div>
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存 Hero
        </button>
      </form>

      <form action="/api/admin/homepage" method="post" className="admin-card rounded-lg p-6">
        <input type="hidden" name="sectionKey" value="news" />
        <h2 className="text-xl font-semibold text-forest-900">最新消息</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">區塊標題</label>
            <input name="title" defaultValue={sections.news.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">區塊副標題</label>
            <textarea name="subtitle" defaultValue={sections.news.subtitle} className="admin-textarea" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="admin-label">更多按鈕文字</label>
              <input
                name="buttonLabel"
                defaultValue={(sections.news.extraJson.buttonLabel as string) || ""}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">更多按鈕連結</label>
              <input
                name="buttonHref"
                defaultValue={(sections.news.extraJson.buttonHref as string) || ""}
                className="admin-input"
              />
            </div>
          </div>

          {newsItems.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">消息卡片 {index + 1}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input type="hidden" name={`newsId-${index}`} defaultValue={item.id} />
                <div>
                  <label className="admin-label">日期</label>
                  <input name={`newsDate-${index}`} defaultValue={item.date} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">時間</label>
                  <input name={`newsTime-${index}`} defaultValue={item.time} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">地點</label>
                  <input name={`newsLocation-${index}`} defaultValue={item.location} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">標題</label>
                  <input name={`newsTitle-${index}`} defaultValue={item.title} className="admin-input" />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">摘要</label>
                  <textarea name={`newsSummary-${index}`} defaultValue={item.summary} className="admin-textarea" />
                </div>
                <div>
                  <label className="admin-label">按鈕文字</label>
                  <input name={`newsButtonLabel-${index}`} defaultValue={item.buttonLabel} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">按鈕連結</label>
                  <input name={`newsHref-${index}`} defaultValue={item.href} className="admin-input" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存最新消息
        </button>
      </form>

      <form
        action="/api/admin/homepage"
        method="post"
        encType="multipart/form-data"
        className="admin-card rounded-lg p-6"
      >
        <input type="hidden" name="sectionKey" value="about" />
        <h2 className="text-xl font-semibold text-forest-900">關於我</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">標題</label>
            <input name="title" defaultValue={sections.about.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">副標題</label>
            <input name="subtitle" defaultValue={sections.about.subtitle} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">自我介紹</label>
            <textarea name="content" defaultValue={sections.about.content} className="admin-textarea" />
          </div>
          <div>
            <label className="admin-label">照片網址</label>
            <input name="image" defaultValue={sections.about.image} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">上傳新照片</label>
            <input name="imageFile" type="file" accept="image/*" className="admin-input" />
          </div>
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存關於我
        </button>
      </form>

      <form action="/api/admin/homepage" method="post" className="admin-card rounded-lg p-6">
        <input type="hidden" name="sectionKey" value="stats" />
        <h2 className="text-xl font-semibold text-forest-900">願景 / 目標 / 參與人數</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">區塊標題</label>
            <input name="title" defaultValue={sections.stats.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">區塊副標題</label>
            <textarea name="subtitle" defaultValue={sections.stats.subtitle} className="admin-textarea" />
          </div>

          {statItems.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">指標卡片 {index + 1}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input type="hidden" name={`statId-${index}`} defaultValue={item.id} />
                <div>
                  <label className="admin-label">Icon 種類</label>
                  <select name={`statIcon-${index}`} defaultValue={item.icon} className="admin-select">
                    <option value="binoculars">binoculars</option>
                    <option value="leaf">leaf</option>
                    <option value="people">people</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">標題</label>
                  <input name={`statTitle-${index}`} defaultValue={item.title} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">數值</label>
                  <input
                    name={`statValue-${index}`}
                    defaultValue={item.value || ""}
                    className="admin-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">內容</label>
                  <textarea name={`statContent-${index}`} defaultValue={item.content} className="admin-textarea" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存指標
        </button>
      </form>

      <form action="/api/admin/homepage" method="post" className="admin-card rounded-lg p-6">
        <input type="hidden" name="sectionKey" value="flow" />
        <h2 className="text-xl font-semibold text-forest-900">活動流程</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">標題</label>
            <input name="title" defaultValue={sections.flow.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">副標題</label>
            <textarea name="subtitle" defaultValue={sections.flow.subtitle} className="admin-textarea" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="admin-label">按鈕文字</label>
              <input
                name="buttonLabel"
                defaultValue={(sections.flow.extraJson.buttonLabel as string) || ""}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">按鈕連結</label>
              <input
                name="buttonHref"
                defaultValue={(sections.flow.extraJson.buttonHref as string) || ""}
                className="admin-input"
              />
            </div>
          </div>

          {flowItems.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">流程步驟 {index + 1}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input type="hidden" name={`flowId-${index}`} defaultValue={item.id} />
                <div>
                  <label className="admin-label">步驟編號</label>
                  <input name={`flowStep-${index}`} defaultValue={item.step} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">步驟標題</label>
                  <input name={`flowTitle-${index}`} defaultValue={item.title} className="admin-input" />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">步驟內容</label>
                  <textarea name={`flowContent-${index}`} defaultValue={item.content} className="admin-textarea" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存流程
        </button>
      </form>

      <form action="/api/admin/homepage" method="post" className="admin-card rounded-lg p-6">
        <input type="hidden" name="sectionKey" value="showcase" />
        <h2 className="text-xl font-semibold text-forest-900">導覽活動開箱</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">標題</label>
            <input name="title" defaultValue={sections.showcase.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">副標題</label>
            <textarea name="subtitle" defaultValue={sections.showcase.subtitle} className="admin-textarea" />
          </div>
          <div>
            <label className="admin-label">介紹文字</label>
            <textarea name="content" defaultValue={sections.showcase.content} className="admin-textarea" />
          </div>
          <div>
            <label className="admin-label">一次上傳多張照片</label>
            <input
              name="showcaseFiles"
              type="file"
              accept="image/*"
              multiple
              className="admin-input"
            />
            <p className="mt-2 text-sm leading-6 text-forest-700/78">
              可一次加入多張照片；前台會自動輪播切換。
            </p>
          </div>
          {showcaseImages.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">照片 {index + 1}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input type="hidden" name={`showcaseId-${index}`} defaultValue={item.id} />
                <div>
                  <label className="admin-label">標題</label>
                  <input name={`showcaseTitle-${index}`} defaultValue={item.title} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">圖片網址</label>
                  <input name={`showcaseImage-${index}`} defaultValue={item.image} className="admin-input" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存開箱內容
        </button>
      </form>

      <form action="/api/admin/homepage" method="post" className="admin-card rounded-lg p-6">
        <input type="hidden" name="sectionKey" value="series" />
        <h2 className="text-xl font-semibold text-forest-900">系列活動</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">標題</label>
            <input name="title" defaultValue={sections.series.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">副標題</label>
            <textarea name="subtitle" defaultValue={sections.series.subtitle} className="admin-textarea" />
          </div>
          {seriesItems.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-forest-200 p-5">
              <h3 className="text-lg font-semibold text-forest-900">系列卡片 {index + 1}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input type="hidden" name={`seriesId-${index}`} defaultValue={item.id} />
                <div>
                  <label className="admin-label">標題</label>
                  <input name={`seriesTitle-${index}`} defaultValue={item.title} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">圖片網址</label>
                  <input name={`seriesImage-${index}`} defaultValue={item.image} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">連結</label>
                  <input name={`seriesHref-${index}`} defaultValue={item.href} className="admin-input" />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">介紹</label>
                  <textarea name={`seriesDescription-${index}`} defaultValue={item.description} className="admin-textarea" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存系列活動
        </button>
      </form>

      <form action="/api/admin/homepage" method="post" className="admin-card rounded-lg p-6">
        <input type="hidden" name="sectionKey" value="subscribe" />
        <h2 className="text-xl font-semibold text-forest-900">訂閱區</h2>
        <div className="mt-5 grid gap-5">
          <div>
            <label className="admin-label">標題</label>
            <input name="title" defaultValue={sections.subscribe.title} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">副標題</label>
            <textarea name="subtitle" defaultValue={sections.subscribe.subtitle} className="admin-textarea" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="admin-label">輸入框提示</label>
              <input
                name="placeholder"
                defaultValue={(sections.subscribe.extraJson.placeholder as string) || ""}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">按鈕文字</label>
              <input
                name="buttonLabel"
                defaultValue={(sections.subscribe.extraJson.buttonLabel as string) || ""}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">成功訊息</label>
              <input
                name="successMessage"
                defaultValue={(sections.subscribe.extraJson.successMessage as string) || ""}
                className="admin-input"
              />
            </div>
          </div>
        </div>
        <button className="mt-6 rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
          儲存訂閱區
        </button>
      </form>
    </AdminShell>
  );
}
