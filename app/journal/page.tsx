import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { formatDate } from "@/lib/utils";
import { getPosts, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
  const publishedPosts = posts.filter((post) => post.status === "published");
  const content = settings.pageContent.journal;

  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main>
        <PageHero
          eyebrow={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
        />

        <section className="section-space">
          <div className="content-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {publishedPosts.map((post) => (
              <article key={post.id} className="site-panel overflow-hidden">
                <div className="relative aspect-[16/11]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 text-sm text-forest-700/70">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>{post.category}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-forest-900">{post.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-forest-700/85">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-forest-700/80">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/journal/${post.slug}`} className="site-button-secondary mt-6">
                    閱讀文章
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
