import Link from "next/link";

import { AmbientBackground } from "@/components/site/ambient-background";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Reveal } from "@/components/site/reveal";
import type {
  HomepageSectionMap,
  HomepageSectionRecord,
  SiteSettingsRecord,
} from "@/lib/types";

interface WixHomePageProps {
  settings: SiteSettingsRecord;
  sections: HomepageSectionMap;
  subscribed?: boolean;
}

// 從 section.extraJson 安全取值
function extra<T = Record<string, unknown>>(section: HomepageSectionRecord | undefined) {
  return (section?.extraJson ?? {}) as T;
}

export function WixHomePage({ settings, sections, subscribed = false }: WixHomePageProps) {
  const hero = sections.hero;
  const news = sections.news;
  const about = sections.about;
  const stats = sections.stats;
  const flow = sections.flow;
  const showcase = sections.showcase;
  const series = sections.series;
  const subscribe = sections.subscribe;

  const heroExtra = extra<{
    eyebrow?: string;
    primaryButtonLabel?: string;
    primaryButtonHref?: string;
    secondaryButtonLabel?: string;
    secondaryButtonHref?: string;
  }>(hero);
  const newsExtra = extra<{
    buttonLabel?: string;
    buttonHref?: string;
    items?: {
      id: string;
      date: string;
      time: string;
      location: string;
      title: string;
      summary: string;
      buttonLabel: string;
      href: string;
    }[];
  }>(news);
  const aboutExtra = extra<{ eyebrow?: string }>(about);
  const statsItems =
    (extra<{ items?: { id: string; icon?: string; title: string; content: string; value?: string }[] }>(stats).items) ??
    [];
  const flowExtra = extra<{
    eyebrow?: string;
    buttonLabel?: string;
    buttonHref?: string;
    items?: { id: string; step: string; title: string; content: string; image?: string }[];
  }>(flow);
  const showcaseExtra = extra<{
    eyebrow?: string;
    images?: { id: string; title: string; image: string }[];
  }>(showcase);
  const seriesItems =
    (extra<{
      items?: { id: string; title: string; description: string; image: string; href?: string; buttonLabel?: string }[];
    }>(series).items) ?? [];
  const subscribeExtra = extra<{ placeholder?: string; buttonLabel?: string }>(subscribe);

  const newsItems = newsExtra.items ?? [];
  const upcoming = newsItems[0];

  return (
    <div className="min-h-screen bg-page-glow text-forest-900">
      <Navbar settings={settings} />

      <main id="home">
        {/* 主視覺 */}
        {hero && hero.visible !== false ? (
          <section className="relative isolate overflow-hidden">
            {/* 背景圖層 */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.image})` }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-900/85 via-forest-900/65 to-forest-700/40"
            />
            <AmbientBackground grid blobs={false} birds className="-z-10" />

            <div className="content-shell relative grid min-h-[88svh] items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
              {/* 文案 */}
              <div className="text-white">
                <Reveal variant="up">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-signal backdrop-blur">
                    <span className="dot-glow inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                    {heroExtra.eyebrow || "Birding × Nature × Future"}
                  </span>
                </Reveal>

                <Reveal variant="up" delay={120}>
                  <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.12] md:text-6xl lg:text-7xl whitespace-pre-line">
                    {hero.title || "走進城市與森林之間，\n重新發現鳥類的世界"}
                  </h1>
                </Reveal>

                <Reveal variant="up" delay={220}>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-lg">
                    {hero.subtitle ||
                      "透過賞鳥活動、自然教育與影像紀錄，帶你用新的方式認識台灣鳥類與生態。"}
                  </p>
                </Reveal>

                <Reveal variant="up" delay={320}>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href={heroExtra.primaryButtonHref || "/activities"}
                      className="btn-primary"
                    >
                      {heroExtra.primaryButtonLabel || "立即報名活動"}
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href={heroExtra.secondaryButtonHref || "#about"}
                      className="btn-secondary border-white/35 bg-white/10 text-white hover:bg-white/20"
                    >
                      {heroExtra.secondaryButtonLabel || "認識賞鳥人"}
                    </Link>
                  </div>
                </Reveal>

                {/* 觀察介面式資訊條 */}
                <Reveal variant="up" delay={460}>
                  <div className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-white/15 pt-6 text-white/85">
                    {[
                      { v: "120+", l: "賞鳥活動" },
                      { v: "85", l: "鳥種紀錄" },
                      { v: "2,400+", l: "親子參與" },
                    ].map((s) => (
                      <div key={s.l}>
                        <p className="text-2xl font-bold text-signal md:text-3xl">{s.v}</p>
                        <p className="mt-1 text-xs leading-5 text-white/70 md:text-sm">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* 玻璃卡：下一場活動 */}
              <Reveal variant="scale" delay={300}>
                <div className="glass-dark glow-ring relative p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
                      Next Event
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                      Live Schedule
                    </span>
                  </div>

                  {upcoming ? (
                    <>
                      <p className="mt-5 text-2xl font-bold leading-tight text-white">
                        {upcoming.title}
                      </p>
                      {upcoming.summary ? (
                        <p className="mt-3 text-sm leading-7 text-white/75">{upcoming.summary}</p>
                      ) : null}
                      <div className="mt-5 grid gap-3 text-sm text-white/85">
                        {upcoming.date ? (
                          <p className="flex items-center gap-2.5">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-signal">
                              📅
                            </span>
                            {upcoming.date}
                            {upcoming.time ? ` · ${upcoming.time}` : ""}
                          </p>
                        ) : null}
                        {upcoming.location ? (
                          <p className="flex items-center gap-2.5">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-signal">
                              📍
                            </span>
                            {upcoming.location}
                          </p>
                        ) : null}
                      </div>
                      <Link
                        href={upcoming.href || "/activities"}
                        className="btn-primary mt-6 w-full"
                      >
                        {upcoming.buttonLabel || "查看活動詳情"}
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="mt-5 text-xl font-bold text-white">
                        每月固定都會公園賞鳥導覽
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/75">
                        報名即將開放，加入訂閱搶先收到第一手活動消息。
                      </p>
                      <Link href="/activities" className="btn-primary mt-6 w-full">
                        查看活動行程
                      </Link>
                    </>
                  )}

                  <div className="deco-line mt-6 opacity-30" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/45">
                    City · Forest · Future
                  </p>
                </div>
              </Reveal>
            </div>

            {/* 底部漸層融合 */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f7fbf8]"
            />
          </section>
        ) : null}

        {/* 最新消息 */}
        {news && news.visible !== false ? (
          <section className="relative border-b border-forest-100 bg-white py-10">
            <div className="content-shell">
              <Reveal variant="up">
                <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-600">
                      Latest
                    </p>
                    <p className="mt-1 text-2xl font-bold text-forest-900">
                      {news.title || "最新消息"}
                    </p>
                  </div>
                  {news.subtitle ? (
                    <p className="leading-7 text-forest-700">{news.subtitle}</p>
                  ) : (
                    <span />
                  )}
                  {newsExtra.buttonLabel ? (
                    <Link
                      href={newsExtra.buttonHref || "/activities"}
                      className="btn-secondary"
                    >
                      {newsExtra.buttonLabel}
                    </Link>
                  ) : null}
                </div>
              </Reveal>

              {newsItems.length ? (
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {newsItems.map((item, idx) => (
                    <Reveal key={item.id} variant="up" delay={idx * 100}>
                      <article className="lift glass relative h-full overflow-hidden p-5">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                          <span>{item.date || "近期"}</span>
                          {item.time ? <span>{item.time}</span> : null}
                        </div>
                        <h3 className="mt-3 text-lg font-bold leading-snug text-forest-900">
                          {item.title}
                        </h3>
                        {item.location ? (
                          <p className="mt-1.5 text-xs text-forest-600">📍 {item.location}</p>
                        ) : null}
                        {item.summary ? (
                          <p className="mt-3 text-sm leading-7 text-forest-700">
                            {item.summary}
                          </p>
                        ) : null}
                        {item.buttonLabel ? (
                          <Link
                            href={item.href || "/activities"}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 transition hover:text-forest-900"
                          >
                            {item.buttonLabel}
                            <span aria-hidden className="transition group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        ) : null}
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* 關於我 + 願景/目標/人數 */}
        {about && about.visible !== false ? (
          <section id="about" className="section-space relative overflow-hidden bg-[#f7fbf8]">
            <AmbientBackground birds={false} blobs grid />
            <div className="content-shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <Reveal variant="left">
                <div className="relative">
                  <div className="zoom-img relative overflow-hidden rounded-2xl shadow-card">
                    <img
                      src={about.image}
                      alt={about.title}
                      className="h-[460px] w-full object-cover"
                    />
                  </div>
                  {/* 角光暈 */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-signal/40 blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-4 -left-4 h-24 w-24 rounded-full bg-glow/40 blur-2xl"
                  />
                  {/* 觀察介面數字標籤 */}
                  <div className="glass absolute -bottom-5 left-6 right-6 grid grid-cols-3 gap-4 p-4 md:left-10 md:right-10">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-forest-600">SINCE</p>
                      <p className="mt-1 text-lg font-bold text-forest-900">2018</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-forest-600">SPECIES</p>
                      <p className="mt-1 text-lg font-bold text-forest-900">85+</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-forest-600">EVENTS</p>
                      <p className="mt-1 text-lg font-bold text-forest-900">120+</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal variant="right">
                  {aboutExtra.eyebrow ? (
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                      {aboutExtra.eyebrow}
                    </p>
                  ) : null}
                  <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-forest-900 md:text-5xl">
                    {about.title}
                  </h2>
                  <p className="mt-5 leading-8 text-forest-800">{about.content}</p>
                </Reveal>

                {statsItems.length ? (
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {statsItems.map((item, idx) => (
                      <Reveal key={item.id} variant="up" delay={idx * 90}>
                        <div className="glass lift relative h-full p-5">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-forest-700 to-forest-500 text-base text-white shadow-glow-soft">
                            {item.icon || "✦"}
                          </span>
                          <h3 className="mt-4 font-bold text-forest-900">{item.title}</h3>
                          {item.value ? (
                            <p className="mt-2 bg-gradient-to-r from-forest-800 to-forest-500 bg-clip-text text-2xl font-bold text-transparent">
                              {item.value}
                            </p>
                          ) : null}
                          <p className="mt-2 text-sm leading-6 text-forest-700">{item.content}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {/* 導覽活動流程 */}
        {flow && flow.visible !== false ? (
          <section className="section-space relative overflow-hidden bg-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-site-grid [background-size:48px_48px] opacity-[0.18]"
            />
            <div className="content-shell relative">
              <Reveal variant="up">
                <div className="max-w-2xl">
                  {flowExtra.eyebrow ? (
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                      {flowExtra.eyebrow}
                    </p>
                  ) : null}
                  <h2 className="mt-4 text-balance text-3xl font-bold text-forest-900 md:text-5xl">
                    {flow.title}
                  </h2>
                  {flow.subtitle ? (
                    <p className="mt-3 leading-8 text-forest-700">{flow.subtitle}</p>
                  ) : null}
                </div>
              </Reveal>

              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {(flowExtra.items ?? []).map((item, idx) => (
                  <Reveal key={item.id} variant="up" delay={idx * 110}>
                    <article className="lift group glass relative flex h-full flex-col overflow-hidden p-0">
                      {item.image ? (
                        <div className="zoom-img relative aspect-[4/3] overflow-hidden bg-forest-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/35 via-transparent to-transparent"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-forest-800 to-forest-600 font-bold text-white shadow-glow-soft">
                          {item.step}
                        </p>
                        <h3 className="mt-5 text-lg font-bold text-forest-900">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-forest-700">{item.content}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              {flowExtra.buttonLabel ? (
                <Reveal variant="up">
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Link href={flowExtra.buttonHref || "/contact"} className="btn-primary">
                      {flowExtra.buttonLabel}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* 導覽活動開箱 */}
        {showcase && showcase.visible !== false ? (
          <section className="section-space relative overflow-hidden bg-[#f7fbf8]">
            <AmbientBackground birds={false} blobs grid />
            <div className="content-shell relative">
              <Reveal variant="up">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    {showcaseExtra.eyebrow ? (
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                        {showcaseExtra.eyebrow}
                      </p>
                    ) : null}
                    <h2 className="mt-4 text-balance text-3xl font-bold text-forest-900 md:text-5xl">
                      {showcase.title}
                    </h2>
                  </div>
                  {showcase.subtitle ? (
                    <p className="max-w-xl leading-8 text-forest-700">{showcase.subtitle}</p>
                  ) : null}
                </div>
              </Reveal>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {(showcaseExtra.images ?? []).map((item, idx) => (
                  <Reveal key={item.id} variant="up" delay={idx * 90}>
                    <figure className="lift group relative overflow-hidden rounded-2xl bg-white shadow-soft">
                      <div className="zoom-img relative h-72 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
                        />
                      </div>
                      <figcaption className="border-t border-forest-100/60 px-5 py-3 text-sm leading-6 text-forest-700">
                        {item.title}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* 活動系列 */}
        {series && series.visible !== false && seriesItems.length ? (
          <section className="section-space relative overflow-hidden bg-white">
            <div className="content-shell relative">
              <Reveal variant="up">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                    Series
                  </p>
                  <h2 className="mt-4 text-balance text-3xl font-bold text-forest-900 md:text-5xl">
                    {series.title}
                  </h2>
                  {series.subtitle ? (
                    <p className="mt-3 leading-8 text-forest-700">{series.subtitle}</p>
                  ) : null}
                </div>
              </Reveal>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {seriesItems.map((item, idx) => (
                  <Reveal key={item.id} variant="up" delay={idx * 120}>
                    <article
                      className="lift group relative min-h-[440px] overflow-hidden rounded-2xl bg-cover bg-center text-white shadow-card"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(7, 28, 20, 0.06), rgba(7, 28, 20, 0.78)), url(${item.image})`,
                      }}
                    >
                      <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.04] group-hover:brightness-110" />
                      <div className="relative flex h-full flex-col justify-end p-7">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-signal backdrop-blur">
                          Featured
                        </span>
                        <h3 className="mt-4 text-3xl font-bold leading-tight">{item.title}</h3>
                        <p className="mt-4 max-w-md leading-8 text-white/85">{item.description}</p>
                        <Link
                          href={item.href || "/activities"}
                          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:bg-signal"
                        >
                          {item.buttonLabel || "看更多活動"}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* 行動呼籲區 */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700"
          />
          <AmbientBackground grid blobs birds className="-z-10 opacity-90" />
          <div className="content-shell relative py-20 text-center text-white md:py-28">
            <Reveal variant="up">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-signal">
                Join · Observe · Connect
              </p>
            </Reveal>
            <Reveal variant="up" delay={120}>
              <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight md:text-5xl">
                一起走進鳥類的世界
              </h2>
            </Reveal>
            <Reveal variant="up" delay={220}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                從城市到森林，從晨霧到日落。
                我們相信每一次觀察，都是一場與自然的對話。
              </p>
            </Reveal>
            <Reveal variant="up" delay={320}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/activities" className="btn-primary">
                  查看活動 <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/activities"
                  className="btn-secondary border-white/35 bg-white/10 text-white hover:bg-white/20"
                >
                  立即報名
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 訂閱區塊 */}
        {subscribe && subscribe.visible !== false ? (
          <section className="relative overflow-hidden bg-white py-16">
            <div className="content-shell">
              <Reveal variant="up">
                <div className="glass relative overflow-hidden p-8 md:p-12">
                  <div className="grid gap-6 md:grid-cols-[1fr_420px] md:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
                        Subscribe
                      </p>
                      <h2 className="mt-3 text-balance text-2xl font-bold text-forest-900 md:text-4xl">
                        {subscribe.title}
                      </h2>
                      {subscribe.subtitle ? (
                        <p className="mt-3 leading-8 text-forest-700">{subscribe.subtitle}</p>
                      ) : null}
                      {subscribed ? (
                        <p className="mt-4 inline-flex rounded-full bg-signal/25 px-4 py-2 text-sm font-semibold text-forest-900">
                          ✓ 已收到你的訂閱，之後有新活動會第一時間通知你。
                        </p>
                      ) : null}
                    </div>
                    <form
                      action="/api/subscribe"
                      method="post"
                      className="grid gap-3 sm:grid-cols-[1fr_auto]"
                    >
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={subscribeExtra.placeholder || "輸入你的 Email"}
                        className="site-input"
                      />
                      <button className="btn-primary">
                        {subscribeExtra.buttonLabel || "訂閱通知"}
                      </button>
                    </form>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-signal/30 blur-3xl"
                  />
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}
      </main>

      <Footer settings={settings} />
    </div>
  );
}
