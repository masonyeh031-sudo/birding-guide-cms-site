import Link from "next/link";
import { notFound } from "next/navigation";

import { AmbientBackground } from "@/components/site/ambient-background";
import { Footer } from "@/components/site/footer";
import { ImageRotator } from "@/components/site/image-rotator";
import { Navbar } from "@/components/site/navbar";
import { Reveal } from "@/components/site/reveal";
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

  const infoCards = [
    { label: "日期", value: formatDate(activity.date), icon: "📅" },
    { label: "時間", value: activity.time, icon: "⏰" },
    {
      label: "集合地點",
      value: activity.meetingPoint || activity.location,
      icon: "📍",
    },
    { label: "費用", value: activity.price || "現場公告", icon: "💎" },
  ];

  return (
    <div className="min-h-screen bg-page-glow pb-24 lg:pb-0">
      <Navbar settings={settings} />
      <main>
        {/* 主視覺 */}
        <section className="relative isolate overflow-hidden border-b border-forest-100">
          <AmbientBackground birds={false} blobs grid />
          <div className="content-shell relative grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Reveal variant="up">
                <Link
                  href="/activities"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition hover:text-forest-900"
                >
                  <span aria-hidden>←</span> 返回所有活動
                </Link>
              </Reveal>
              <Reveal variant="up" delay={100}>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest-200/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-forest-700 backdrop-blur">
                  <span className="dot-glow inline-block h-1.5 w-1.5 rounded-full bg-forest-500" />
                  Activity
                </span>
              </Reveal>
              <Reveal variant="up" delay={180}>
                <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-forest-900 md:text-6xl">
                  {activity.title}
                </h1>
              </Reveal>
              <Reveal variant="up" delay={260}>
                <p className="mt-5 text-base leading-8 text-forest-700/85 md:text-lg">
                  {activity.description}
                </p>
              </Reveal>

              <div className="mt-7 grid gap-3 text-sm text-forest-700 sm:grid-cols-2">
                {infoCards.map((card, idx) => (
                  <Reveal key={card.label} variant="up" delay={360 + idx * 80}>
                    <div className="glass lift relative flex items-start gap-3 p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-forest-700 to-forest-500 text-base text-white shadow-glow-soft">
                        {card.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.16em] text-forest-600">
                          {card.label}
                        </p>
                        <p className="mt-1 break-words font-semibold text-forest-900">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal variant="up" delay={680}>
                <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
                  <a href="#register" className="btn-primary">
                    立即報名 <span aria-hidden>→</span>
                  </a>
                  <a href="#schedule" className="btn-secondary">
                    查看活動流程
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={120}>
              <div className="overflow-hidden rounded-2xl border border-forest-100/80 bg-white shadow-card">
                <ImageRotator images={images} alt={activity.title} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-space">
          <div className="content-shell grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="space-y-6">
              {/* 活動流程 timeline */}
              <Reveal variant="up">
                <section id="schedule" className="glass relative p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                      Schedule
                    </p>
                    <span className="text-xs text-forest-600">活動流程</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-forest-900">當天會怎麼進行</h2>

                  <ol className="timeline mt-6 space-y-5">
                    {(activity.schedule?.length
                      ? activity.schedule
                      : [activity.description]
                    ).map((item, idx) => (
                      <li key={`${item}-${idx}`} className="relative">
                        <span className="timeline-dot" />
                        <div className="rounded-xl bg-white/80 p-3.5 text-sm leading-7 text-forest-800 shadow-soft backdrop-blur">
                          {item}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>

              {/* 活動亮點 */}
              <Reveal variant="up">
                <section className="glass p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                    Highlights
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-forest-900">活動亮點</h2>
                  <div className="mt-5 grid gap-3">
                    {(activity.highlights?.length
                      ? activity.highlights
                      : [
                          "認識城市常見鳥類",
                          "練習賞鳥入門方法",
                          "參加小型戶外導覽",
                        ]
                    ).map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-forest-100 bg-white/70 px-4 py-3 text-sm leading-7 text-forest-800 backdrop-blur transition hover:border-forest-300 hover:bg-white"
                      >
                        <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-signal/40 text-[10px] font-bold text-forest-900">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* 注意事項 - 摺疊 */}
              <Reveal variant="up">
                <section className="glass p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                    Notes
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-forest-900">注意事項</h2>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-forest-700">
                    {(activity.notices?.length
                      ? activity.notices
                      : ["請準時集合，並穿著適合步行的鞋子。"]
                    ).map((item, idx) => (
                      <li
                        key={`${item}-${idx}`}
                        className="flex items-start gap-3 border-b border-forest-100 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </div>

            {/* 報名表單 */}
            <Reveal variant="up">
              <section
                id="register"
                className="glass glow-ring relative overflow-hidden p-6 md:p-8 lg:sticky lg:top-24"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-signal/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-forest-800">
                  <span className="dot-glow inline-block h-1.5 w-1.5 rounded-full bg-forest-700" />
                  Registration
                </span>
                <h2 className="mt-4 text-2xl font-bold text-forest-900 md:text-3xl">
                  填寫報名表單
                </h2>
                <p className="mt-3 text-sm leading-7 text-forest-700/85">
                  請每位成人各填一份報名表；國小以下兒童請另行填寫。
                  送出後導覽人員會再用 Email 或電話和您確認集合細節與付款資訊。
                </p>

                {query.status === "registered" ? (
                  <div className="mt-5 rounded-xl border border-forest-300 bg-forest-50 px-4 py-3 text-sm font-semibold text-forest-800">
                    ✓ 已收到您的報名資料，後續會再聯絡您。
                  </div>
                ) : null}
                {query.status === "invalid" ? (
                  <div className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
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

                  <div className="rounded-xl border border-forest-100 bg-white/70 p-5 backdrop-blur">
                    <label className="site-label">
                      電子郵件 <span className="text-forest-600">*</span>
                    </label>
                    <input name="email" type="email" className="site-input" required />
                  </div>

                  <div className="rounded-xl border border-forest-100 bg-white/70 p-5 backdrop-blur">
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
                    <div className="rounded-xl border border-forest-100 bg-white/70 p-5 backdrop-blur">
                      <label className="site-label">
                        您的姓名 <span className="text-forest-600">*</span>
                      </label>
                      <input name="name" className="site-input" required />
                      <p className="mt-2 text-xs text-forest-700/70">
                        一位成人填一份；國小以下兒童請另行填寫。
                      </p>
                    </div>
                    <div className="rounded-xl border border-forest-100 bg-white/70 p-5 backdrop-blur">
                      <label className="site-label">
                        您的電話 <span className="text-forest-600">*</span>
                      </label>
                      <input name="phone" className="site-input" required />
                    </div>
                  </div>

                  <div className="rounded-xl border border-forest-100 bg-white/70 p-5 backdrop-blur">
                    <label className="site-label">
                      Line ID <span className="text-forest-600">*</span>
                    </label>
                    <input
                      name="lineId"
                      className="site-input"
                      required
                      placeholder="沒有請填「沒有」"
                    />
                  </div>

                  <div className="rounded-xl border border-forest-100 bg-white/70 p-5 backdrop-blur">
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

                  <label className="flex gap-3 rounded-xl border border-forest-100 bg-white/70 p-5 text-sm leading-6 text-forest-700/85 backdrop-blur">
                    <input
                      name="agreement"
                      type="checkbox"
                      value="yes"
                      className="mt-1 h-4 w-4 rounded border-forest-300"
                      required
                    />
                    <span>我同意送出資料供本次活動聯絡、付款確認與行前通知使用。</span>
                  </label>

                  <button className="btn-primary w-full" type="submit">
                    送出報名 <span aria-hidden>→</span>
                  </button>
                </form>
              </section>
            </Reveal>
          </div>
        </section>
      </main>

      <div className="mobile-cta-bar">
        <a href="#register" className="btn-primary flex-1">
          立即報名
        </a>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
