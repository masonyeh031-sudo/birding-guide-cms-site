import { SectionHeading } from "@/components/site/section-heading";
import { ShowcaseCarousel } from "@/components/home/showcase-carousel";
import type { HomepageSectionRecord, ShowcaseImage } from "@/lib/types";

interface ActivityShowcaseSectionProps {
  section: HomepageSectionRecord;
}

export function ActivityShowcaseSection({ section }: ActivityShowcaseSectionProps) {
  const images = ((section.extraJson as { images?: ShowcaseImage[] }).images || []) as ShowcaseImage[];

  return (
    <section className="section-space border-y border-white/10 bg-carbon-900/45">
      <div className="content-shell">
        <SectionHeading title={section.title} subtitle={section.subtitle} eyebrow="活動開箱" />
        <div className="mt-6 max-w-3xl text-base leading-8 text-white/66">{section.content}</div>
        <div className="mt-10">
          <ShowcaseCarousel images={images} />
        </div>
      </div>
    </section>
  );
}
