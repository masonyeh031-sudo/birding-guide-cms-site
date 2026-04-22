import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { getSubscribers, saveSubscribers } from "@/lib/content-store";
import { getString, isValidEmail } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = getString(formData.get("email")).toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.redirect(new URL("/#register", request.url));
  }

  const subscribers = await getSubscribers();
  const exists = subscribers.some((item) => item.email === email);

  if (!exists) {
    subscribers.unshift({
      id: crypto.randomUUID(),
      email,
      createdAt: new Date().toISOString(),
    });
    await saveSubscribers(subscribers);
  }

  return NextResponse.redirect(new URL("/?subscribed=1#register", request.url));
}
