import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getActivities, saveActivities } from "@/lib/content-store";
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
  const activities = await getActivities();
  const existing = activities.find((item) => item.id === id);
  const files = [...formData.getAll("imageFiles"), ...formData.getAll("imageFile")]
    .filter((value): value is File => value instanceof File && value.size > 0);
  const uploadedUrls = await saveUploadedFiles(files, "activity");
  const manualImages = parseTags(getString(formData.get("images"))).filter(Boolean);
  const primaryImage = getString(formData.get("image"));
  const images = [
    ...(primaryImage ? [primaryImage] : []),
    ...manualImages,
    ...uploadedUrls,
  ].filter(Boolean);

  for (const uploadedUrl of uploadedUrls) {
    await addMediaRecord(uploadedUrl, "activity image");
  }

  const record = {
    id: existing?.id || crypto.randomUUID(),
    title: getString(formData.get("title")),
    date: getString(formData.get("date")),
    time: getString(formData.get("time")),
    location: getString(formData.get("location")),
    meetingPoint: getString(formData.get("meetingPoint")),
    duration: getString(formData.get("duration")),
    price: getString(formData.get("price")),
    description: getString(formData.get("description")),
    schedule: parseTags(getString(formData.get("schedule"))),
    highlights: parseTags(getString(formData.get("highlights"))),
    notices: parseTags(getString(formData.get("notices"))),
    image: images[0] || existing?.image || "",
    images: images.length ? images : existing?.images || [],
    registerUrl: getString(formData.get("registerUrl")),
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as const;

  const nextActivities = existing
    ? activities.map((item) => (item.id === existing.id ? record : item))
    : [record, ...activities];

  await saveActivities(nextActivities);
  return NextResponse.redirect(
    new URL(`/admin/activities?edit=${record.id}&status=saved`, request.url),
  );
}
