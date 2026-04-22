import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import type { HomepageSectionRecord, SeriesItem } from "@/lib/types";

interface SeriesSectionProps {
  section: HomepageSectionRecord;
}

export function SeriesSection({ section }: SeriesSectionProps) {
  const items = ((section.extraJson as { items?: SeriesItem[] }).items || []) as SeriesItem[];

  return (
    <section className="section-space">
      <div className="content-shell">
        <SectionHeading title={section.title} subtitle={section.subtitle} eyebrow="系列活動" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="site-panel overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/82 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-mist">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/64">{item.description}</p>
                <Link href={item.href} className="site-button-secondary mt-6">
                  看更多
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
