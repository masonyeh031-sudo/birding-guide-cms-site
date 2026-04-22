import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { formatDate } from "@/lib/utils";
import { getPosts, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
  const post = posts.find((item) => item.slug === slug && item.status === "published");

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-page-glow">
      <Navbar settings={settings} />
      <main className="section-space">
        <article className="content-shell">
          <Link href="/journal" className="text-sm font-semibold text-signal">
            返回導覽日記
          </Link>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/48">
            <span>{formatDate(post.createdAt)}</span>
            <span>{post.category}</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight text-mist md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 shadow-site">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/84 via-transparent to-transparent" />
          </div>
          <div className="rich-text mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-8 flex flex-wrap gap-2 text-sm text-white/60">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/12 bg-white/6 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
