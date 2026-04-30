import type { ReactNode } from "react";

import { AmbientBackground } from "@/components/site/ambient-background";
import { Reveal } from "@/components/site/reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, actions }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-forest-100 bg-gradient-to-b from-white to-forest-50/70">
      <AmbientBackground birds={false} blobs grid />

      <div className="content-shell relative py-16 md:py-24">
        <Reveal variant="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest-200/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-forest-700 backdrop-blur">
            <span className="dot-glow inline-block h-1.5 w-1.5 rounded-full bg-forest-500" />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal variant="up" delay={140}>
          <h1 className="mt-5 max-w-4xl text-balance text-3xl font-bold leading-tight text-forest-900 md:text-6xl">
            {title}
          </h1>
        </Reveal>

        <Reveal variant="up" delay={240}>
          <p className="mt-5 max-w-3xl text-base leading-8 text-forest-700/85 md:text-lg">
            {subtitle}
          </p>
        </Reveal>

        {actions ? (
          <Reveal variant="up" delay={340}>
            <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
          </Reveal>
        ) : null}
      </div>

      <div className="shimmer-line opacity-40" />
    </section>
  );
}
