import { NextRequest } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getSubscribers } from "@/lib/content-store";

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }

  const subscribers = await getSubscribers();
  const rows = ["email,created_at", ...subscribers.map((item) => `${item.email},${item.createdAt}`)];

  return new Response(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=subscribers.csv",
    },
  });
}
