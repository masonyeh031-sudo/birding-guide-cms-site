import type {
  GalleryItemRecord,
  HomepageSectionMap,
  SiteSettingsRecord,
} from "@/lib/types";
import { ActivityShowcaseSection } from "@/components/home/activity-showcase-section";
import { AboutSection } from "@/components/home/about-section";
import { GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewsSection } from "@/components/home/news-section";
import { SeriesSection } from "@/components/home/series-section";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { TourFlowSection } from "@/components/home/tour-flow-section";
import { VisionStatsSection } from "@/components/home/vision-stats-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

interface HomePageProps {
  settings: SiteSettingsRecord;
  sections: HomepageSectionMap;
  galleryItems: GalleryItemRecord[];
  subscribed?: boolean;
}

export function HomePage({
  settings,
  sections,
  galleryItems,
  subscribed = false,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main>
        <HeroSection section={sections.hero} />
        <NewsSection section={sections.news} />
        <AboutSection section={sections.about} />
        <VisionStatsSection section={sections.stats} />
        <TourFlowSection section={sections.flow} />
        <ActivityShowcaseSection section={sections.showcase} />
        <SeriesSection section={sections.series} />
        <GallerySection items={galleryItems} />
        <SubscribeSection section={sections.subscribe} success={subscribed} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}
