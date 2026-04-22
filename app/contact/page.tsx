import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const query = await searchParams;
  const settings = await getSiteSettings();
  const content = settings.pageContent.contact;

  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main>
        <PageHero
          eyebrow={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
        />

        <section className="section-space">
          <div className="content-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              action="/api/contact"
              method="post"
              className="site-panel p-6 md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="site-label" htmlFor="name">
                    姓名
                  </label>
                  <input id="name" name="name" required className="site-input" />
                </div>
                <div>
                  <label className="site-label" htmlFor="email">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className="site-input" />
                </div>
              </div>
              <div className="mt-5">
                <label className="site-label" htmlFor="message">
                  想說的內容
                </label>
                <textarea id="message" name="message" required className="site-textarea" />
              </div>
              <button type="submit" className="site-button-primary mt-6">
                送出訊息
              </button>
              {query.sent === "1" ? (
                <p className="mt-4 text-sm text-signal">已收到你的訊息，我會盡快回覆。</p>
              ) : null}
            </form>

            <aside className="site-panel-soft p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-mist">聯絡資訊</h2>
              <div className="mt-6 space-y-5 text-sm leading-7 text-white/64">
                <div>
                  <p className="font-semibold text-signal">Email</p>
                  <Link href={`mailto:${settings.contactEmail}`} className="hover:text-mist">
                    {settings.contactEmail}
                  </Link>
                </div>
                <div>
                  <p className="font-semibold text-signal">社群</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {settings.socialLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-white/12 px-3 py-2 hover:text-mist"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
