import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import type { HomepageSectionRecord, NewsItem } from "@/lib/types";

interface NewsSectionProps {
  section: HomepageSectionRecord;
}

export function NewsSection({ section }: NewsSectionProps) {
  const extra = section.extraJson as {
    buttonLabel?: string;
    buttonHref?: string;
    items?: NewsItem[];
  };
  const items = extra.items || [];

  return (
    <section id="latest-news" className="section-space border-y border-white/10">
      <div className="content-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={section.title} subtitle={section.subtitle} eyebrow="活動公告" />
          <Link
            href={extra.buttonHref || "/activities"}
            className="site-button-secondary"
          >
            {extra.buttonLabel || "點我看更多"}
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="site-panel p-6">
              <div className="flex items-center justify-between gap-3 text-sm text-white/54">
                <span>{item.date}</span>
                <span>{item.time}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-mist">{item.title}</h3>
              <p className="mt-3 text-sm font-medium text-signal">{item.location}</p>
              <p className="mt-4 text-sm leading-7 text-white/66">{item.summary}</p>
              <Link
                href={item.href}
                className="mt-6 inline-flex items-center text-sm font-semibold text-signal transition hover:text-[#d8ffa3]"
              >
                {item.buttonLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
