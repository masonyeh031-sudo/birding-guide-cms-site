import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getPortfolioItems, savePortfolioItems } from "@/lib/content-store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const items = await getPortfolioItems();
  await savePortfolioItems(items.filter((item) => item.id !== id));
  return NextResponse.redirect(
    new URL("/admin/portfolio?status=deleted", request.url),
  );
}
