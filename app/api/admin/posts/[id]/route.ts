import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getPosts, savePosts } from "@/lib/content-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const posts = await getPosts();
  await savePosts(posts.filter((post) => post.id !== id));
  return NextResponse.redirect(new URL("/admin/posts?status=deleted", request.url));
}
