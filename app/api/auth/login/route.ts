import { NextRequest, NextResponse } from "next/server";

import {
  authCookieName,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";
import { getAdmins } from "@/lib/content-store";
import { getString } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = getString(formData.get("username"));
  const password = getString(formData.get("password"));

  if (!username || !password) {
    return NextResponse.redirect(
      new URL("/admin/login?error=missing_fields", request.url),
    );
  }

  const admins = await getAdmins();
  const admin = admins.find((item) => item.username === username);

  if (!admin) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid_credentials", request.url),
    );
  }

  const passwordMatched = await verifyPassword(password, admin.passwordHash);

  if (!passwordMatched) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid_credentials", request.url),
    );
  }

  const response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
  const token = createSessionToken(admin.username);
  response.cookies.set(authCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
