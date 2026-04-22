import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getServices, saveServices } from "@/lib/content-store";
import { saveUploadedFile } from "@/lib/media";
import { addMediaRecord } from "@/lib/media-library";
import { getString, parseTags } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const id = getString(formData.get("id"));
  const services = await getServices();
  const existing = services.find((item) => item.id === id);
  const fileValue = formData.get("imageFile");
  const file = fileValue instanceof File ? fileValue : null;
  const uploadedUrl = await saveUploadedFile(file, "service");
  const image = uploadedUrl || getString(formData.get("image")) || existing?.image || "";

  if (uploadedUrl) {
    await addMediaRecord(uploadedUrl, "service image");
  }

  const sortOrderRaw = Number(getString(formData.get("sortOrder")));
  const record = {
    id: existing?.id || crypto.randomUUID(),
    title: getString(formData.get("title")),
    subtitle: getString(formData.get("subtitle")),
    description: getString(formData.get("description")),
    duration: getString(formData.get("duration")),
    price: getString(formData.get("price")),
    image,
    features: parseTags(getString(formData.get("features"))),
    sortOrder: Number.isFinite(sortOrderRaw) ? sortOrderRaw : services.length + 1,
  } as const;

  const nextServices = existing
    ? services.map((item) => (item.id === existing.id ? record : item))
    : [...services, record];

  await saveServices(nextServices);
  return NextResponse.redirect(
    new URL(`/admin/services?edit=${record.id}&status=saved`, request.url),
  );
}
