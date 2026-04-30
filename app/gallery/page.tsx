import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { GalleryBoard } from "@/components/site/gallery-board";
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
            <Link href="/activities" className="btn-primary">
              查看活動場次
            </Link>
          }
        />

        <section className="section-space">
          <div className="content-shell">
            <GalleryBoard items={items} />
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
