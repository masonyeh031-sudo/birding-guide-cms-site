import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getBirds, saveBirds } from "@/lib/content-store";
import { addMediaRecord } from "@/lib/media-library";
import { saveUploadedFiles } from "@/lib/media";
import type { BirdRecord } from "@/lib/types";
import { getString, parseTags } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const id = getString(formData.get("id"));
  const birds = await getBirds();
  const existing = birds.find((bird) => bird.id === id);
  const now = new Date().toISOString();
  const files = formData
    .getAll("imageFiles")
    .filter((value): value is File => value instanceof File && value.size > 0);
  const uploadedUrls = await saveUploadedFiles(files, "bird");

  for (const uploadedUrl of uploadedUrls) {
    await addMediaRecord(uploadedUrl, "bird image");
  }

  const manualGalleryImages = parseTags(getString(formData.get("galleryImages")));
  const primaryImage = getString(formData.get("image"));
  const galleryImages = [
    ...(primaryImage ? [primaryImage] : []),
    ...manualGalleryImages,
    ...uploadedUrls,
  ].filter(Boolean);

  const record: BirdRecord = {
    id: existing?.id || crypto.randomUUID(),
    name: getString(formData.get("name")),
    englishName: getString(formData.get("englishName")),
    image: galleryImages[0] || existing?.image || "",
    galleryImages: galleryImages.length ? Array.from(new Set(galleryImages)) : existing?.galleryImages || [],
    description: getString(formData.get("description")),
    detailedDescription: getString(formData.get("detailedDescription")),
    habitat: parseTags(getString(formData.get("habitat"))),
    category: getString(formData.get("category")),
    observationPoint: getString(formData.get("observationPoint")),
    sourceText: getString(formData.get("sourceText")),
    tags: parseTags(getString(formData.get("tags"))),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  const nextBirds = existing
    ? birds.map((bird) => (bird.id === existing.id ? record : bird))
    : [record, ...birds];

  await saveBirds(nextBirds);
  return NextResponse.redirect(
    new URL(`/admin/birds?edit=${record.id}&status=saved`, request.url),
  );
}
