import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getPortfolioItems, savePortfolioItems } from "@/lib/content-store";
import { addMediaRecord } from "@/lib/media-library";
import { saveUploadedFiles } from "@/lib/media";
import { getString, parseTags } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const id = getString(formData.get("id"));
  const items = await getPortfolioItems();
  const existing = items.find((item) => item.id === id);
  const files = [...formData.getAll("imageFiles"), ...formData.getAll("imageFile")]
    .filter((value): value is File => value instanceof File && value.size > 0);
  const uploadedUrls = await saveUploadedFiles(files, "portfolio");
  const manualImages = parseTags(getString(formData.get("images"))).filter(Boolean);
  const primaryImage = getString(formData.get("image"));
  const images = [
    ...(primaryImage ? [primaryImage] : []),
    ...manualImages,
    ...uploadedUrls,
  ].filter(Boolean);

  for (const uploadedUrl of uploadedUrls) {
    await addMediaRecord(uploadedUrl, "portfolio image");
  }

  const record = {
    id: existing?.id || crypto.randomUUID(),
    title: getString(formData.get("title")),
    image: images[0] || existing?.image || "",
    images: images.length ? images : existing?.images || [],
    description: getString(formData.get("description")),
    link: getString(formData.get("link")),
  } as const;

  const nextItems = existing
    ? items.map((item) => (item.id === existing.id ? record : item))
    : [record, ...items];

  await savePortfolioItems(nextItems);
  return NextResponse.redirect(
    new URL(`/admin/portfolio?edit=${record.id}&status=saved`, request.url),
  );
}
