import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getRegistrations, saveRegistrations } from "@/lib/content-store";
import type { RegistrationStatus } from "@/lib/types";
import { getString } from "@/lib/utils";

const validStatuses = new Set<RegistrationStatus>([
  "new",
  "contacted",
  "confirmed",
  "cancelled",
]);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const formData = await request.formData();
  const registrations = await getRegistrations();

  if (getString(formData.get("intent")) === "delete") {
    await saveRegistrations(registrations.filter((item) => item.id !== id));
    return NextResponse.redirect(new URL("/admin/registrations?status=deleted", request.url));
  }

  const nextStatus = getString(formData.get("status")) as RegistrationStatus;
  const status = validStatuses.has(nextStatus) ? nextStatus : "new";

  await saveRegistrations(
    registrations.map((item) => (item.id === id ? { ...item, status } : item)),
  );

  return NextResponse.redirect(new URL("/admin/registrations?status=saved", request.url));
}
