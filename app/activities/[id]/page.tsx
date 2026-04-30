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
    <div className="min-h-screen bg-page-glow pb-24 lg:pb-0">
      <Navbar settings={settings} />
      <main>
        <section className="relative overflow-hidden border-b border-forest-100">
          <div className="absolute inset-0 bg-site-grid [background-size:42px_42px] opacity-[0.08]" />
          <div className="content-shell relative grid gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <Link href="/activities" className="text-sm font-semibold text-signal">
                返回所有活動
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-forest-700/70">
                查看報名資訊
              </p>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-tight text-forest-900 md:text-6xl">
                {activity.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-forest-700/85 md:text-lg">
                {activity.description}
              </p>
              <div className="mt-7 grid gap-3 text-sm text-forest-700 sm:grid-cols-2">
                <div className="site-panel-soft p-4">
                  <p className="text-forest-700/60">日期</p>
                  <p className="mt-1 font-semibold text-forest-900">{formatDate(activity.date)}</p>
                </div>
                <div className="site-panel-soft p-4">
                  <p className="text-forest-700/60">時間</p>
                  <p className="mt-1 font-semibold text-forest-900">{activity.time}</p>
                </div>
                <div className="site-panel-soft p-4">
                  <p className="text-forest-700/60">集合地點</p>
                  <p className="mt-1 font-semibold text-forest-900">
                    {activity.meetingPoint || activity.location}
                  </p>
                </div>
                <div className="site-panel-soft p-4">
                  <p className="text-forest-700/60">費用</p>
                  <p className="mt-1 font-semibold text-forest-900">{activity.price || "現場公告"}</p>
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
                <h2 className="text-2xl font-semibold text-forest-900">當天會怎麼進行</h2>
                <ol className="mt-5 space-y-4 text-sm leading-7 text-forest-700/85">
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
                        className="rounded-lg border border-forest-200 bg-forest-50 px-4 py-3 text-sm text-forest-700/85"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </section>

              <section className="site-panel p-6">
                <p className="site-label">注意事項</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-forest-700/80">
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
              <h2 className="text-3xl font-semibold text-forest-900">填寫報名表單</h2>
              <p className="mt-3 text-sm leading-7 text-forest-700/80">
                請每位成人各填一份報名表；國小以下兒童請另行填寫。送出後導覽人員會再用 Email 或電話和您確認集合細節與付款資訊。
              </p>

              {query.status === "registered" ? (
                <div className="mt-6 rounded-lg border border-forest-300 bg-forest-50 px-4 py-3 text-sm font-semibold text-forest-800">
                  已收到您的報名資料，後續會再聯絡您。
                </div>
              ) : null}
              {query.status === "invalid" ? (
                <div className="mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  請確認所有必填欄位都已填寫，並勾選同意。
                </div>
              ) : null}

              <form action="/api/register" method="post" className="mt-7 space-y-5">
                <input type="hidden" name="activityId" value={activity.id} />
                <input type="hidden" name="returnPath" value={returnPath} />
                <input
                  type="hidden"
                  name="ticketType"
                  value={`${activity.title} / ${activity.price || "費用待確認"}`}
                />

                <div className="rounded-lg border border-forest-200 bg-forest-50 p-5">
                  <label className="site-label">
                    電子郵件 <span className="text-forest-600">*</span>
                  </label>
                  <input name="email" type="email" className="site-input" required />
                </div>

                <div className="rounded-lg border border-forest-200 bg-forest-50 p-5">
                  <p className="site-label">
                    請問您繳交報名費了嗎？ <span className="text-forest-600">*</span>
                  </p>
                  <div className="mt-2 flex flex-col gap-2 text-sm text-forest-800">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="paymentStatus" value="我已經匯款完了" required />
                      我已經匯款完了
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="paymentStatus" value="我要現場繳費" />
                      我要現場繳費
                    </label>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-lg border border-forest-200 bg-forest-50 p-5">
                    <label className="site-label">
                      您的姓名 <span className="text-forest-600">*</span>
                    </label>
                    <input name="name" className="site-input" required />
                    <p className="mt-2 text-xs text-forest-700/70">
                      一位成人填一份；國小以下兒童請另行填寫。
                    </p>
                  </div>
                  <div className="rounded-lg border border-forest-200 bg-forest-50 p-5">
                    <label className="site-label">
                      您的電話 <span className="text-forest-600">*</span>
                    </label>
                    <input name="phone" className="site-input" required />
                  </div>
                </div>

                <div className="rounded-lg border border-forest-200 bg-forest-50 p-5">
                  <label className="site-label">
                    Line ID <span className="text-forest-600">*</span>
                  </label>
                  <input name="lineId" className="site-input" required placeholder="沒有請填「沒有」" />
                </div>

                <div className="rounded-lg border border-forest-200 bg-forest-50 p-5">
                  <p className="site-label">
                    請問您現在是學生，還是已經就業了？ <span className="text-forest-600">*</span>
                  </p>
                  <div className="mt-2 flex flex-col gap-2 text-sm text-forest-800">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="employmentStatus" value="學生" required />
                      學生
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="employmentStatus" value="就業" />
                      就業
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="employmentStatus" value="退休" />
                      退休
                    </label>
                  </div>
                </div>

                <label className="flex gap-3 rounded-lg border border-forest-200 bg-forest-50 p-5 text-sm leading-6 text-forest-700/85">
                  <input
                    name="agreement"
                    type="checkbox"
                    value="yes"
                    className="mt-1 h-4 w-4 rounded border-forest-300"
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

      <div className="mobile-cta-bar">
        <a href="#register" className="site-button-primary">立即報名</a>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
