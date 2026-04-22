import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import type { FlowItem, HomepageSectionRecord } from "@/lib/types";

interface TourFlowSectionProps {
  section: HomepageSectionRecord;
}

export function TourFlowSection({ section }: TourFlowSectionProps) {
  const extra = section.extraJson as {
    buttonLabel?: string;
    buttonHref?: string;
    items?: FlowItem[];
  };
  const items = extra.items || [];

  return (
    <section className="section-space">
      <div className="content-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading title={section.title} subtitle={section.subtitle} eyebrow="活動流程" />
          <Link href={extra.buttonHref || "/contact"} className="site-button-primary mt-8">
            {extra.buttonLabel || "填寫活動回饋"}
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="site-panel grid gap-4 p-5 md:grid-cols-[88px_1fr]">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/6 text-xl font-bold text-signal">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-mist">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/64">{item.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
