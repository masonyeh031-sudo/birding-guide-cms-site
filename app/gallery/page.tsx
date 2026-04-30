import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { getGalleryItems, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const fallback = {
  eyebrow: "鏡頭下的鳥日子",
  title: "影像紀實",
  subtitle: "城市公園、海岸、山徑與田野中的相遇，用影像留下牠們的姿態。",
};

export default async function GalleryPage() {
  const [settings, items] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main>
        <PageHero
          eyebrow={fallback.eyebrow}
          title={fallback.title}
          subtitle={fallback.subtitle}
          actions={
            <Link href="/activities" className="site-button-primary">
              查看活動場次
            </Link>
          }
        />

        <section className="section-space">
          <div className="content-shell">
            {items.length === 0 ? (
              <div className="site-panel p-10 text-center">
                <p className="text-base text-forest-700">相簿正在整理中，敬請期待。</p>
              </div>
            ) : (
              <div className="gallery-masonry">
                {items.map((item) => (
                  <figure
                    key={item.id}
                    className="mb-4 overflow-hidden rounded-lg bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <img src={item.image} alt={item.caption || ""} className="h-auto w-full object-cover" />
                    {item.caption ? (
                      <figcaption className="px-4 py-3 text-sm leading-6 text-forest-700">
                        {item.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
