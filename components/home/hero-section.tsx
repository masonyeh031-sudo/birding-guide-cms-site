import Link from "next/link";

import type { HomepageSectionRecord } from "@/lib/types";

interface HeroSectionProps {
  section: HomepageSectionRecord;
}

export function HeroSection({ section }: HeroSectionProps) {
  const extra = section.extraJson as {
    primaryButtonLabel?: string;
    primaryButtonHref?: string;
    secondaryButtonLabel?: string;
    secondaryButtonHref?: string;
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <img
          src={section.image}
          alt="導覽現場主視覺"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/76 to-carbon-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-carbon-950/36" />
      <div className="absolute inset-0 bg-site-grid [background-size:44px_44px] opacity-[0.08]" />
      <div className="content-shell relative flex min-h-[calc(100vh-84px)] items-end py-16 md:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">
            賞鳥導覽個人品牌
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-5xl font-bold leading-[1.02] text-mist md:text-7xl">
            {section.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/72 md:text-xl">
            {section.subtitle}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">{section.content}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={extra.primaryButtonHref || "/activities"} className="site-button-primary">
              {extra.primaryButtonLabel || "查看最新活動"}
            </Link>
            <Link href={extra.secondaryButtonHref || "#about"} className="site-button-secondary">
              {extra.secondaryButtonLabel || "認識我"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
