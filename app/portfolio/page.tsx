import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { ImageRotator } from "@/components/site/image-rotator";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { getPortfolioItems, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [settings, items] = await Promise.all([getSiteSettings(), getPortfolioItems()]);
  const content = settings.pageContent.portfolio;

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
          <div className="content-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="site-panel overflow-hidden"
              >
                <div>
                  <ImageRotator
                    images={item.images?.length ? item.images : [item.image]}
                    alt={item.title}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-mist">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/64">{item.description}</p>
                  <Link href={item.link || "#"} className="site-button-secondary mt-6">
                    查看內容
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
