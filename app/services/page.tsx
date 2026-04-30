import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { ImageRotator } from "@/components/site/image-rotator";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { getServices, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const content = settings.pageContent.services;

  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main>
        <PageHero
          eyebrow={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
          actions={
            <Link href={content.actionHref || "/contact"} className="site-button-primary">
              {content.actionLabel || "聯絡客製導覽"}
            </Link>
          }
        />

        <section className="section-space">
          <div className="content-shell space-y-6">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="site-panel grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <ImageRotator
                    images={[service.image]}
                    alt={service.title}
                    aspectClassName="aspect-auto h-full min-h-[300px]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">
                    {service.duration}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-mist">{service.title}</h2>
                  <p className="mt-3 text-base leading-8 text-forest-700">{service.subtitle}</p>
                  <p className="mt-5 text-sm leading-7 text-forest-700/80">{service.description}</p>
                  <div className="mt-6 rounded-lg border border-forest-200 bg-forest-50 px-4 py-3 text-sm font-semibold text-mist">
                    {service.price}
                  </div>
                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-forest-700/85 md:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="rounded-lg border border-forest-200 bg-forest-50 px-4 py-3">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="site-button-secondary mt-7">
                    詢問這個服務
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
