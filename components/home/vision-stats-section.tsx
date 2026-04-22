import { SectionHeading } from "@/components/site/section-heading";
import type { HomepageSectionRecord, StatItem } from "@/lib/types";

interface VisionStatsSectionProps {
  section: HomepageSectionRecord;
}

function Icon({ kind }: { kind: string }) {
  const common = "h-6 w-6 text-signal";

  if (kind === "leaf") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M18.5 5.5c-5.5.3-9.6 2.5-11.8 6.7-1 1.9-1.4 3.8-1.2 5.8 2-.3 3.8-1 5.3-2.2 4.2-3.2 6.4-7 7.7-10.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16c2.7-1.8 5.3-4 7.8-6.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "people") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19.5c0-2.4 2.2-4 4.5-4s4.5 1.6 4.5 4M11.5 19.5c.2-1.9 1.8-3.3 4.3-3.3 2.3 0 4.2 1.3 4.7 3.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path d="M4.5 15.5V7.2c0-.9.7-1.7 1.7-1.7h1.1c.8 0 1.5.5 1.7 1.2l.6 1.8h5l.6-1.8c.2-.7.9-1.2 1.7-1.2h1.1c.9 0 1.7.8 1.7 1.7v8.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15.5h16v2a1 1 0 0 1-1 1h-2v-2H7v2H5a1 1 0 0 1-1-1v-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function VisionStatsSection({ section }: VisionStatsSectionProps) {
  const items = ((section.extraJson as { items?: StatItem[] }).items || []) as StatItem[];

  return (
    <section className="section-space border-y border-white/10 bg-carbon-900/52">
      <div className="content-shell">
        <SectionHeading
          title={section.title}
          subtitle={section.subtitle}
          eyebrow="願景與目標"
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="site-panel p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/6">
                <Icon kind={item.icon} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-mist">{item.title}</h3>
              {item.value ? (
                <p className="mt-4 text-3xl font-bold text-signal">{item.value}</p>
              ) : null}
              <p className="mt-4 text-sm leading-7 text-white/64">{item.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
