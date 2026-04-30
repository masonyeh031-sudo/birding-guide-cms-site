import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-forest-100 bg-forest-50/60">
      <div className="absolute inset-0 bg-site-grid [background-size:42px_42px] opacity-[0.25]" />
      <div className="content-shell relative py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest-600">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight text-forest-900 md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-forest-700/85 md:text-lg">
          {subtitle}
        </p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
