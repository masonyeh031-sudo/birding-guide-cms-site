import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getServices, saveServices } from "@/lib/content-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const services = await getServices();
  await saveServices(services.filter((item) => item.id !== id));
  return NextResponse.redirect(new URL("/admin/services?status=deleted", request.url));
}
