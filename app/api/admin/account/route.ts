import { NextRequest, NextResponse } from "next/server";

import {
  authCookieName,
  createSessionToken,
  hashPassword,
  requireAdminRequest,
  verifyPassword,
} from "@/lib/auth";
import { getAdmins, saveAdmins } from "@/lib/content-store";
import { getString } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const username = getString(formData.get("username"));
  const currentPassword = getString(formData.get("currentPassword"));
  const nextPassword = getString(formData.get("nextPassword"));

  const passwordMatched = await verifyPassword(currentPassword, admin.passwordHash);

  if (!passwordMatched) {
    return NextResponse.redirect(
      new URL("/admin/account?error=invalid_password", request.url),
    );
  }

  const admins = await getAdmins();
  const nextHash = nextPassword ? await hashPassword(nextPassword) : admin.passwordHash;
  const nextAdmins = admins.map((item) =>
    item.id === admin.id ? { ...item, username, passwordHash: nextHash } : item,
  );

  await saveAdmins(nextAdmins);

  const response = NextResponse.redirect(
    new URL("/admin/account?status=saved", request.url),
  );
  response.cookies.set(authCookieName, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
