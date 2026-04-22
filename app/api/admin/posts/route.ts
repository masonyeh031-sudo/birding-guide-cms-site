import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getPosts, savePosts } from "@/lib/content-store";
import { addMediaRecord } from "@/lib/media-library";
import { saveUploadedFile } from "@/lib/media";
import { getString, parseTags, slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const id = getString(formData.get("id"));
  const posts = await getPosts();
  const existing = posts.find((post) => post.id === id);

  const fileValue = formData.get("coverImageFile");
  const file = fileValue instanceof File ? fileValue : null;
  const uploadedUrl = await saveUploadedFile(file, "post-cover");
  const coverImage =
    uploadedUrl || getString(formData.get("coverImage")) || existing?.coverImage || "";

  if (uploadedUrl) {
    await addMediaRecord(uploadedUrl, "post cover");
  }

  const record = {
    id: existing?.id || crypto.randomUUID(),
    title: getString(formData.get("title")),
    slug:
      getString(formData.get("slug")) ||
      slugify(getString(formData.get("title"))) ||
      existing?.slug ||
      crypto.randomUUID(),
    coverImage,
    excerpt: getString(formData.get("excerpt")),
    content: getString(formData.get("content")),
    category: getString(formData.get("category")),
    tags: parseTags(getString(formData.get("tags"))),
    status: getString(formData.get("status")) === "published" ? "published" : "draft",
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as const;

  const nextPosts = existing
    ? posts.map((post) => (post.id === existing.id ? record : post))
    : [record, ...posts];

  await savePosts(nextPosts);
  return NextResponse.redirect(
    new URL(`/admin/posts?edit=${record.id}&status=saved`, request.url),
  );
}
