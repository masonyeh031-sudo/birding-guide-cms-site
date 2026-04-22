import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { getContactMessages, saveContactMessages } from "@/lib/content-store";
import { getString, isValidEmail } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email"));
  const message = getString(formData.get("message"));

  if (!name || !isValidEmail(email) || !message) {
    return NextResponse.redirect(new URL("/contact", request.url));
  }

  const messages = await getContactMessages();
  messages.unshift({
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });
  await saveContactMessages(messages);

  return NextResponse.redirect(new URL("/contact?sent=1", request.url));
}
