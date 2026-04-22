import Link from "next/link";

import { ImageRotator } from "@/components/site/image-rotator";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { getActivities, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {
  const [settings, activities] = await Promise.all([getSiteSettings(), getActivities()]);
  const content = settings.pageContent.activities;

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
              {content.actionLabel || "詢問包團導覽"}
            </Link>
          }
        />

        <section id="activity-list" className="section-space">
          <div className="content-shell space-y-6">
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="site-panel grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]"
              >
                <div className="min-h-[260px]">
                  <ImageRotator
                    images={activity.images?.length ? activity.images : [activity.image]}
                    alt={activity.title}
                    aspectClassName="aspect-auto h-full min-h-[260px]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-3 text-sm text-white/48">
                    <span>{activity.date}</span>
                    <span>{activity.time}</span>
                    <span>{activity.location}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold text-mist">{activity.title}</h2>
                  <p className="mt-5 text-base leading-8 text-white/64">{activity.description}</p>
                  <div className="mt-6 grid gap-3 text-sm text-white/56 sm:grid-cols-3">
                    <span>{activity.price || "費用待確認"}</span>
                    <span>{activity.duration || "時間依活動公告"}</span>
                    <span>{activity.meetingPoint || activity.location}</span>
                  </div>
                  <Link href={`/activities/${activity.id}`} className="site-button-secondary mt-7">
                    查看報名資訊
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
