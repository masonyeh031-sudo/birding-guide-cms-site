import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import {
  getGalleryItems,
  getMediaLibrary,
  saveGalleryItems,
  saveMediaLibrary,
} from "@/lib/content-store";
import { deleteUploadedFile } from "@/lib/media";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const type = request.nextUrl.searchParams.get("type");

  if (type === "media") {
    const mediaItems = await getMediaLibrary();
    const current = mediaItems.find((item) => item.id === id);
    if (current?.url) {
      await deleteUploadedFile(current.url);
    }
    await saveMediaLibrary(mediaItems.filter((item) => item.id !== id));
    return NextResponse.redirect(new URL("/admin/gallery?status=deleted", request.url));
  }

  const galleryItems = await getGalleryItems();
  const current = galleryItems.find((item) => item.id === id);
  if (current?.image) {
    await deleteUploadedFile(current.image);
  }
  await saveGalleryItems(galleryItems.filter((item) => item.id !== id));
  return NextResponse.redirect(new URL("/admin/gallery?status=deleted", request.url));
}
