import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { MessageBanner } from "@/components/admin/message-banner";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { requireAdmin } from "@/lib/auth";
import { getPosts } from "@/lib/content-store";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const emptyPost = {
  id: "",
  title: "",
  slug: "",
  coverImage: "",
  excerpt: "",
  content: "<p>在這裡開始撰寫文章內容。</p>",
  category: "",
  tags: [],
  status: "draft",
};

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; status?: string }>;
}) {
  const [admin, posts, query] = await Promise.all([requireAdmin(), getPosts(), searchParams]);
  const selected = posts.find((post) => post.id === query.edit) ?? posts[0] ?? emptyPost;
  const isNew = query.edit === "new" || !posts.length;
  const current = isNew ? emptyPost : selected;

  return (
    <AdminShell
      username={admin.username}
      activeHref="/admin/posts"
      title="導覽日記管理"
      description="可新增、編輯、刪除文章，並控制草稿與發佈狀態。內文編輯器支援基本 rich text。"
      headerAction={
        <Link href="/admin/posts?edit=new" className="rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white">
          新增貼文
        </Link>
      }
    >
      <MessageBanner message={query.status === "saved" ? "貼文已儲存。" : query.status === "deleted" ? "貼文已刪除。" : ""} />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="admin-card rounded-lg p-5">
          <h2 className="text-lg font-semibold text-forest-900">文章列表</h2>
          <div className="mt-4 space-y-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts?edit=${post.id}`}
                className={`block rounded-lg border px-4 py-4 ${
                  current.id === post.id && !isNew
                    ? "border-forest-500 bg-forest-50"
                    : "border-forest-200 hover:border-forest-300"
                }`}
              >
                <p className="text-sm text-forest-700/78">{formatDate(post.createdAt)}</p>
                <p className="mt-2 font-semibold text-forest-900">{post.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-clay">{post.status}</p>
              </Link>
            ))}
          </div>
        </aside>

        <form
          action="/api/admin/posts"
          method="post"
          encType="multipart/form-data"
          className="admin-card rounded-lg p-6"
        >
          <input type="hidden" name="id" value={current.id} />
          <h2 className="text-xl font-semibold text-forest-900">{isNew ? "新增貼文" : "編輯貼文"}</h2>
          <div className="mt-5 grid gap-5">
            <div>
              <label className="admin-label">標題</label>
              <input name="title" defaultValue={current.title} className="admin-input" required />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">Slug</label>
                <input name="slug" defaultValue={current.slug} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">分類</label>
                <input name="category" defaultValue={current.category} className="admin-input" />
              </div>
            </div>
            <div>
              <label className="admin-label">摘要</label>
              <textarea name="excerpt" defaultValue={current.excerpt} className="admin-textarea" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">封面圖網址</label>
                <input name="coverImage" defaultValue={current.coverImage} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">上傳封面圖</label>
                <input name="coverImageFile" type="file" accept="image/*" className="admin-input" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="admin-label">Tags（以逗號分隔）</label>
                <input name="tags" defaultValue={current.tags.join(", ")} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">狀態</label>
                <select name="status" defaultValue={current.status} className="admin-select">
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </div>
            </div>
            <div>
              <label className="admin-label">內文</label>
              <RichTextEditor name="content" initialValue={current.content} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-lg bg-forest-700 px-5 py-3 text-sm font-semibold text-white">
              儲存貼文
            </button>
            {!isNew && current.id ? (
              <button
                formAction={`/api/admin/posts/${current.id}`}
                className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600"
              >
                刪除貼文
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
