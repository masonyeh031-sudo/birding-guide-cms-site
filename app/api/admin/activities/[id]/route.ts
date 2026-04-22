import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getActivities, saveActivities } from "@/lib/content-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const activities = await getActivities();
  await saveActivities(activities.filter((item) => item.id !== id));
  return NextResponse.redirect(
    new URL("/admin/activities?status=deleted", request.url),
  );
}
