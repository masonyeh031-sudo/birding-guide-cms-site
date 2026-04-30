import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getRegistrations } from "@/lib/content-store";

function csvEscape(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const registrations = await getRegistrations();
  const header = [
    "createdAt",
    "status",
    "activityTitle",
    "name",
    "email",
    "phone",
    "lineId",
    "paymentStatus",
    "employmentStatus",
    "participants",
    "ticketType",
    "companionNames",
    "experience",
    "source",
    "needs",
  ];
  const rows = registrations.map((item) =>
    [
      item.createdAt,
      item.status,
      item.activityTitle,
      item.name,
      item.email,
      item.phone,
      item.lineId ?? "",
      item.paymentStatus ?? "",
      item.employmentStatus ?? "",
      item.participants,
      item.ticketType,
      item.companionNames,
      item.experience,
      item.source,
      item.needs,
    ]
      .map(csvEscape)
      .join(","),
  );

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="birding-registrations.csv"',
    },
  });
}
