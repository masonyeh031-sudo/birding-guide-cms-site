import Link from "next/link";

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
  const newsExtra = extra<{ buttonLabel?: string; buttonHref?: string }>(news);
  const aboutExtra = extra<{ eyebrow?: string }>(about);
  const statsItems =
    (extra<{ items?: { id: string; title: string; content: string; value?: string }[] }>(stats).items) ?? [];
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

  return (
    <div className="min-h-screen bg-[#f7fbf8] text-[#1d2f28]">
      {/* 導覽列 */}
      <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/92 backdrop-blur-xl">
        <div className="content-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-forest-800 text-lg font-bold text-white">
              鳥
            </span>
            <span className="block text-xl font-bold">{settings.siteName}</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-forest-800">
            <a href="#home" className="rounded-lg px-3 py-2 hover:bg-forest-50">主頁</a>
            <Link href="/journal" className="rounded-lg px-3 py-2 hover:bg-forest-50">導覽日記</Link>
            <Link href="/activities" className="rounded-lg px-3 py-2 hover:bg-forest-50">都會公園導覽活動</Link>
            <Link href="/portfolio" className="rounded-lg px-3 py-2 hover:bg-forest-50">看更多觀鳥人作品</Link>
            <a href="#contact" className="rounded-lg px-3 py-2 hover:bg-forest-50">聯絡資訊</a>
            <Link href="/activities" className="rounded-lg bg-forest-800 px-4 py-2.5 text-white hover:bg-forest-700">
              我要報名活動
            </Link>
          </nav>
        </div>
      </header>

      <main id="home">
        {/* 主視覺 */}
        {hero && hero.visible !== false ? (
          <section
            className="relative min-h-[76svh] overflow-hidden bg-cover bg-center text-white"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(7, 28, 20, 0.78), rgba(7, 28, 20, 0.36)), url(${hero.image})`,
            }}
          >
            <div className="content-shell flex min-h-[76svh] items-center py-16">
              <div className="max-w-3xl">
                {heroExtra.eyebrow ? (
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8f17b]">
                    {heroExtra.eyebrow}
                  </p>
                ) : null}
                <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl whitespace-pre-line">
                  {hero.title}
                </h1>
                {hero.subtitle ? (
                  <p className="mt-6 max-w-2xl text-lg leading-9 text-white/86">{hero.subtitle}</p>
                ) : null}
                <div className="mt-8 flex flex-wrap gap-3">
                  {heroExtra.primaryButtonLabel ? (
                    <Link
                      href={heroExtra.primaryButtonHref || "/activities"}
                      className="rounded-lg bg-[#b8f17b] px-5 py-3 font-semibold text-forest-900"
                    >
                      {heroExtra.primaryButtonLabel}
                    </Link>
                  ) : null}
                  {heroExtra.secondaryButtonLabel ? (
                    <Link
                      href={heroExtra.secondaryButtonHref || "#about"}
                      className="rounded-lg border border-white/55 px-5 py-3 font-semibold text-white"
                    >
                      {heroExtra.secondaryButtonLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* 最新消息 */}
        {news && news.visible !== false ? (
          <section className="border-b border-forest-100 bg-white py-7">
            <div className="content-shell grid gap-4 md:grid-cols-[220px_1fr_auto] md:items-center">
              <p className="text-2xl font-bold text-forest-900">{news.title}</p>
              <p className="text-forest-700">{news.subtitle}</p>
              {newsExtra.buttonLabel ? (
                <Link href={newsExtra.buttonHref || "/activities"} className="rounded-lg bg-forest-800 px-4 py-3 text-center text-sm font-semibold text-white">
                  {newsExtra.buttonLabel}
                </Link>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* 關於我 + 願景/目標/人數 */}
        {about && about.visible !== false ? (
          <section className="section-space bg-[#f7fbf8]">
            <div className="content-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="overflow-hidden rounded-lg shadow-card">
                <img src={about.image} alt={about.title} className="h-[420px] w-full object-cover" />
              </div>
              <div>
                {aboutExtra.eyebrow ? (
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">
                    {aboutExtra.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-4 text-4xl font-bold text-forest-900">{about.title}</h2>
                <p className="mt-5 leading-8 text-forest-800">{about.content}</p>
                {statsItems.length ? (
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {statsItems.map((item) => (
                      <div key={item.id} className="rounded-lg border border-forest-100 bg-white p-5 shadow-soft">
                        <p className="text-2xl">✦</p>
                        <h3 className="mt-4 font-bold text-forest-900">{item.title}</h3>
                        {item.value ? (
                          <p className="mt-2 text-2xl font-bold text-forest-900">{item.value}</p>
                        ) : null}
                        <p className="mt-2 text-sm leading-6 text-forest-700">{item.content}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {/* 導覽活動流程 */}
        {flow && flow.visible !== false ? (
          <section className="section-space bg-white">
            <div className="content-shell">
              <div className="max-w-2xl">
                {flowExtra.eyebrow ? (
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">
                    {flowExtra.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-4 text-4xl font-bold text-forest-900">{flow.title}</h2>
                {flow.subtitle ? (
                  <p className="mt-3 leading-8 text-forest-700">{flow.subtitle}</p>
                ) : null}
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {(flowExtra.items ?? []).map((item) => (
                  <article key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-forest-100 bg-[#f7fbf8]">
                    {item.image ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="grid h-10 w-10 place-items-center rounded-lg bg-forest-800 font-bold text-white">
                        {item.step}
                      </p>
                      <h3 className="mt-5 text-xl font-bold text-forest-900">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-forest-700">{item.content}</p>
                    </div>
                  </article>
                ))}
              </div>
              {flowExtra.buttonLabel ? (
                <div className="mt-8">
                  <Link href={flowExtra.buttonHref || "/contact"} className="inline-flex rounded-lg bg-forest-800 px-5 py-3 text-sm font-semibold text-white">
                    {flowExtra.buttonLabel}
                  </Link>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* 導覽活動開箱 */}
        {showcase && showcase.visible !== false ? (
          <section className="section-space bg-[#f7fbf8]">
            <div className="content-shell">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  {showcaseExtra.eyebrow ? (
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">
                      {showcaseExtra.eyebrow}
                    </p>
                  ) : null}
                  <h2 className="mt-4 text-4xl font-bold text-forest-900">{showcase.title}</h2>
                </div>
                {showcase.subtitle ? (
                  <p className="max-w-xl leading-8 text-forest-700">{showcase.subtitle}</p>
                ) : null}
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {(showcaseExtra.images ?? []).map((item) => (
                  <figure key={item.id} className="overflow-hidden rounded-lg bg-white shadow-soft">
                    <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
                    <figcaption className="p-4 text-sm leading-6 text-forest-700">{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* 活動系列 */}
        {series && series.visible !== false && seriesItems.length ? (
          <section className="section-space bg-white">
            <div className="content-shell">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-forest-900">{series.title}</h2>
                {series.subtitle ? (
                  <p className="mt-3 leading-8 text-forest-700">{series.subtitle}</p>
                ) : null}
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {seriesItems.map((item) => (
                  <article
                    key={item.id}
                    className="relative min-h-[420px] overflow-hidden rounded-lg bg-cover bg-center text-white shadow-card"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(7, 28, 20, 0.08), rgba(7, 28, 20, 0.78)), url(${item.image})`,
                    }}
                  >
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <h3 className="text-3xl font-bold">{item.title}</h3>
                      <p className="mt-4 leading-8 text-white/88">{item.description}</p>
                      <Link href={item.href || "/activities"} className="mt-5 inline-flex rounded-lg bg-white px-4 py-3 text-sm font-semibold text-forest-900">
                        {item.buttonLabel || "看更多活動"}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* 訂閱區塊 */}
        {subscribe && subscribe.visible !== false ? (
          <section className="bg-forest-900 py-16 text-white">
            <div className="content-shell grid gap-6 md:grid-cols-[1fr_420px] md:items-center">
              <div>
                <h2 className="text-4xl font-bold">{subscribe.title}</h2>
                {subscribe.subtitle ? (
                  <p className="mt-4 text-white/72">{subscribe.subtitle}</p>
                ) : null}
                {subscribed ? (
                  <p className="mt-4 rounded-lg bg-[#b8f17b]/20 px-4 py-3 text-sm text-[#b8f17b]">
                    已收到你的訂閱，之後有新活動會第一時間通知你。
                  </p>
                ) : null}
              </div>
              <form action="/api/subscribe" method="post" className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={subscribeExtra.placeholder || "Enter your email here"}
                  className="rounded-lg border border-white/18 bg-white px-4 py-3 text-forest-900 outline-none"
                />
                <button className="rounded-lg bg-[#b8f17b] px-5 py-3 font-semibold text-forest-900">
                  {subscribeExtra.buttonLabel || "Sign Up"}
                </button>
              </form>
            </div>
          </section>
        ) : null}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white">
        <div className="content-shell flex flex-col gap-4 py-8 text-sm text-forest-700 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold text-forest-900">{settings.siteName}</p>
            <p className="mt-2">聯絡資訊 {settings.contactEmail}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-forest-900">
              Email
            </a>
            <Link href="/admin/login" className="text-xs text-forest-500">
              後台登入
            </Link>
            <p>{settings.footerBottomText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
