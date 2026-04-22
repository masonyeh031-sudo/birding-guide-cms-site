import { SectionHeading } from "@/components/site/section-heading";
import type { GalleryItemRecord } from "@/lib/types";

interface GallerySectionProps {
  items: GalleryItemRecord[];
}

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section className="section-space border-y border-white/10">
      <div className="content-shell">
        <SectionHeading
          title="圖片紀錄牆"
          subtitle="帶隊、講解、觀察巢位、夜間行走與雨天停留，這些都是導覽裡很真實的片段。"
          eyebrow="活動紀錄"
          align="center"
        />
        <div className="gallery-masonry mt-10">
          {items.map((item) => (
            <figure key={item.id} className="site-panel mb-4 overflow-hidden">
              <div className="relative min-h-[280px]">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm leading-7 text-white/62">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
