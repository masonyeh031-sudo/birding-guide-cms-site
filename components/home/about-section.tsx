import { SectionHeading } from "@/components/site/section-heading";
import type { HomepageSectionRecord } from "@/lib/types";

interface AboutSectionProps {
  section: HomepageSectionRecord;
}

export function AboutSection({ section }: AboutSectionProps) {
  return (
    <section id="about" className="section-space">
      <div className="content-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-white/10 shadow-site">
          <img
            src={section.image}
            alt="賞鳥導覽者個人照片"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/70 via-transparent to-transparent" />
        </div>

        <div>
          <SectionHeading
            title={section.title}
            subtitle={section.subtitle}
            eyebrow="帶路的人"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            {section.content}
          </p>
        </div>
      </div>
    </section>
  );
}
