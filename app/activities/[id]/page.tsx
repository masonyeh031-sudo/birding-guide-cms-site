import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/site/footer";
import { ImageRotator } from "@/components/site/image-rotator";
import { Navbar } from "@/components/site/navbar";
import { getActivities, getSiteSettings } from "@/lib/content-store";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ActivityDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ id }, query, settings, activities] = await Promise.all([
    params,
    searchParams,
    getSiteSettings(),
    getActivities(),
  ]);
  const activity = activities.find((item) => item.id === id);

  if (!activity) {
    notFound();
  }

  const images = activity.images?.length ? activity.images : [activity.image];
  const returnPath = `/activities/${activity.id}`;

  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-site-grid [background-size:42px_42px] opacity-[0.08]" />
          <div className="content-shell relative grid gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <Link href="/activities" className="text-sm font-semibold text-signal">
                返回所有活動
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/52">
                查看報名資訊
              </p>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-tight text-mist md:text-6xl">
                {activity.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-white/68 md:text-lg">
                {activity.description}
              </p>
              <div className="mt-7 grid gap-3 text-sm text-white/72 sm:grid-cols-2">
                <div className="site-panel-soft p-4">
                  <p className="text-white/42">日期</p>
                  <p className="mt-1 font-semibold text-mist">{formatDate(activity.date)}</p>
                </div>
                <div className="site-panel-soft p-4">
                  <p className="text-white/42">時間</p>
                  <p className="mt-1 font-semibold text-mist">{activity.time}</p>
                </div>
                <div className="site-panel-soft p-4">
                  <p className="text-white/42">集合地點</p>
                  <p className="mt-1 font-semibold text-mist">
                    {activity.meetingPoint || activity.location}
                  </p>
                </div>
                <div className="site-panel-soft p-4">
                  <p className="text-white/42">費用</p>
                  <p className="mt-1 font-semibold text-mist">{activity.price || "現場公告"}</p>
                </div>
              </div>
            </div>
            <div className="site-panel overflow-hidden">
              <ImageRotator images={images} alt={activity.title} />
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="content-shell grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="space-y-6">
              <section className="site-panel p-6">
                <p className="site-label">活動內容</p>
                <h2 className="text-2xl font-semibold text-mist">當天會怎麼進行</h2>
                <ol className="mt-5 space-y-4 text-sm leading-7 text-white/66">
                  {(activity.schedule?.length ? activity.schedule : [activity.description]).map(
                    (item) => (
                      <li key={item} className="border-l border-signal/50 pl-4">
                        {item}
                      </li>
                    ),
                  )}
                </ol>
              </section>

              <section className="site-panel p-6">
                <p className="site-label">適合你，如果你想</p>
                <div className="mt-4 grid gap-3">
                  {(activity.highlights?.length
                    ? activity.highlights
                    : ["認識城市常見鳥類", "練習賞鳥入門方法", "參加小型戶外導覽"]).map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/68"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </section>

              <section className="site-panel p-6">
                <p className="site-label">注意事項</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/64">
                  {(activity.notices?.length
                    ? activity.notices
                    : ["請準時集合，並穿著適合步行的鞋子。"]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section id="register" className="site-panel p-6 md:p-8">
              <p className="site-label">賞鳥報名</p>
              <h2 className="text-3xl font-semibold text-mist">填寫報名表單</h2>
              <p className="mt-3 text-sm leading-7 text-white/62">
                送出後會先進入待確認名單，導覽人員會再用 Email 或電話和你確認付款與集合細節。
              </p>

              {query.status === "registered" ? (
                <div className="mt-6 rounded-lg border border-signal/40 bg-signal/10 px-4 py-3 text-sm font-semibold text-signal">
                  已收到報名資料，後台可以查看這筆報名。
                </div>
              ) : null}
              {query.status === "invalid" ? (
                <div className="mt-6 rounded-lg border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                  請確認姓名、Email、電話與同意勾選都已填寫。
                </div>
              ) : null}

              <form action="/api/register" method="post" className="mt-7 space-y-5">
                <input type="hidden" name="activityId" value={activity.id} />
                <input type="hidden" name="returnPath" value={returnPath} />

                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <label className="site-label">
                    活動場次 <span className="text-signal">*</span>
                  </label>
                  <input
                    name="ticketType"
                    defaultValue={`${activity.title} / ${activity.price || "費用待確認"}`}
                    className="site-input"
                    required
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <label className="site-label">
                      姓名 <span className="text-signal">*</span>
                    </label>
                    <input name="name" className="site-input" required />
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <label className="site-label">
                      手機 <span className="text-signal">*</span>
                    </label>
                    <input name="phone" className="site-input" required />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <label className="site-label">
                      Email <span className="text-signal">*</span>
                    </label>
                    <input name="email" type="email" className="site-input" required />
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <label className="site-label">參加人數</label>
                    <input
                      name="participants"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="site-input"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <label className="site-label">同行者姓名</label>
                  <textarea
                    name="companionNames"
                    className="site-textarea"
                    placeholder="若有同行者，可填寫姓名或稱呼。"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <label className="site-label">賞鳥經驗</label>
                    <select name="experience" className="site-input" defaultValue="第一次參加">
                      <option>第一次參加</option>
                      <option>參加過 1-2 次</option>
                      <option>已有固定觀察經驗</option>
                      <option>想以攝影為主</option>
                    </select>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <label className="site-label">從哪裡看到活動</label>
                    <select name="source" className="site-input" defaultValue="官網">
                      <option>官網</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>YouTube</option>
                      <option>朋友推薦</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <label className="site-label">備註 / 特殊需求</label>
                  <textarea
                    name="needs"
                    className="site-textarea"
                    placeholder="例如：小朋友年齡、是否需提前離開、是否不方便入鏡。"
                  />
                </div>

                <label className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-white/68">
                  <input
                    name="agreement"
                    type="checkbox"
                    value="yes"
                    className="mt-1 h-4 w-4 rounded border-white/20"
                    required
                  />
                  <span>
                    我同意送出資料供本次活動聯絡、付款確認與行前通知使用。
                  </span>
                </label>

                <button className="site-button-primary w-full" type="submit">
                  送出報名
                </button>
              </form>
            </section>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
