import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import {
  getGalleryItems,
  getMediaLibrary,
  saveGalleryItems,
  saveMediaLibrary,
} from "@/lib/content-store";
import { addMediaRecord } from "@/lib/media-library";
import { deleteUploadedFile, saveUploadedFile, saveUploadedFiles } from "@/lib/media";
import { getString } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const intent = getString(formData.get("intent"));

  if (intent === "media-upload") {
    const label = getString(formData.get("label"));
    const files = formData
      .getAll("files")
      .filter((value): value is File => value instanceof File && value.size > 0);
    const uploadedUrls = await saveUploadedFiles(files, "media");
    const directUrl = getString(formData.get("url"));

    if (directUrl) {
      await addMediaRecord(directUrl, label || "media item");
    }

    for (const uploadedUrl of uploadedUrls) {
      await addMediaRecord(uploadedUrl, label || "media item");
    }

    return NextResponse.redirect(new URL("/admin/gallery?status=saved", request.url));
  }

  if (intent === "media-save") {
    const id = getString(formData.get("id"));
    const items = await getMediaLibrary();
    const existing = items.find((item) => item.id === id);
    const fileValue = formData.get("file");
    const file = fileValue instanceof File ? fileValue : null;
    const uploadedUrl = await saveUploadedFile(file, "media");
    const url = uploadedUrl || getString(formData.get("url")) || existing?.url || "";
    const label = getString(formData.get("label")) || existing?.label || "media item";

    if (uploadedUrl && existing?.url && existing.url !== uploadedUrl) {
      await deleteUploadedFile(existing.url);
    }

    const nextItems = existing
      ? items.map((item) => (item.id === existing.id ? { ...item, url, label } : item))
      : items;

    await saveMediaLibrary(nextItems);
    return NextResponse.redirect(new URL("/admin/gallery?status=saved", request.url));
  }

  const id = getString(formData.get("id"));
  const items = await getGalleryItems();
  const existing = items.find((item) => item.id === id);

  const files = [...formData.getAll("imageFiles"), ...formData.getAll("imageFile")]
    .filter((value): value is File => value instanceof File && value.size > 0);
  const uploadedUrls = await saveUploadedFiles(files, "gallery");
  const uploadedUrl = uploadedUrls[0] || "";
  const image = uploadedUrl || getString(formData.get("image")) || existing?.image || "";

  for (const url of uploadedUrls) {
    await addMediaRecord(url, "gallery image");
  }

  if (!existing && uploadedUrls.length > 1) {
    const baseSortOrder = Number(getString(formData.get("sortOrder"))) || 99;
    const newItems = uploadedUrls.map((url, index) => ({
      id: crypto.randomUUID(),
      image: url,
      caption:
        index === 0
          ? getString(formData.get("caption"))
          : `${getString(formData.get("caption")) || "Gallery 圖片"} ${index + 1}`,
      sortOrder: baseSortOrder + index,
    }));
    await saveGalleryItems([...items, ...newItems]);
    return NextResponse.redirect(new URL("/admin/gallery?status=saved", request.url));
  }

  const record = {
    id: existing?.id || crypto.randomUUID(),
    image,
    caption: getString(formData.get("caption")),
    sortOrder: Number(getString(formData.get("sortOrder"))) || 99,
  } as const;

  const nextItems = existing
    ? items.map((item) => (item.id === existing.id ? record : item))
    : [...items, record];

  await saveGalleryItems(nextItems);

  const mediaItems = await getMediaLibrary();
  await saveMediaLibrary(mediaItems);

  return NextResponse.redirect(new URL("/admin/gallery?status=saved", request.url));
}
