import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  getActivities,
  getRegistrations,
  saveRegistrations,
} from "@/lib/content-store";
import { getString, isValidEmail } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (
    !contentType.includes("multipart/form-data") &&
    !contentType.includes("application/x-www-form-urlencoded")
  ) {
    return NextResponse.redirect(new URL("/activities?status=invalid", request.url));
  }

  const formData = await request.formData();
  const activityId = getString(formData.get("activityId"));
  const returnPath = getString(formData.get("returnPath")) || "/activities";
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email"));
  const phone = getString(formData.get("phone"));
  const agreement = getString(formData.get("agreement"));
  const participantsRaw = Number(getString(formData.get("participants")));
  const participants =
    Number.isFinite(participantsRaw) && participantsRaw > 0 ? participantsRaw : 1;

  const activities = await getActivities();
  const activity = activities.find((item) => item.id === activityId);

  if (!activity || !name || !isValidEmail(email) || !phone || agreement !== "yes") {
    return NextResponse.redirect(new URL(`${returnPath}?status=invalid`, request.url));
  }

  const registrations = await getRegistrations();
  registrations.unshift({
    id: crypto.randomUUID(),
    activityId: activity.id,
    activityTitle: activity.title,
    name,
    email,
    phone,
    participants,
    ticketType: getString(formData.get("ticketType")) || activity.price,
    companionNames: getString(formData.get("companionNames")),
    experience: getString(formData.get("experience")),
    needs: getString(formData.get("needs")),
    source: getString(formData.get("source")),
    status: "new",
    createdAt: new Date().toISOString(),
  });

  await saveRegistrations(registrations);
  return NextResponse.redirect(new URL(`${returnPath}?status=registered`, request.url));
}
