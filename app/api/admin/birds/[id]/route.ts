import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getBirds, saveBirds } from "@/lib/content-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const birds = await getBirds();
  await saveBirds(birds.filter((bird) => bird.id !== id));

  return NextResponse.redirect(
    new URL("/admin/birds?status=deleted", request.url),
  );
}
