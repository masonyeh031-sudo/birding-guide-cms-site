import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { getAdmins } from "@/lib/content-store";

const COOKIE_NAME = "urban_birding_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "67edeb06158d42ff7ade416f51b92191d33620f883097ad5482d536c0f93b087";

function createSignature(value: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function createSessionToken(username: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${username}.${expiresAt}`;
  const signature = createSignature(payload);
  return `${payload}.${signature}`;
}

function parseToken(token: string) {
  const [username, expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (!username || !expiresAtRaw || !signature || Number.isNaN(expiresAt)) {
    return null;
  }

  const payload = `${username}.${expiresAt}`;
  const expectedSignature = createSignature(payload);

  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const isValidSignature = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!isValidSignature || expiresAt < Date.now()) {
    return null;
  }

  return { username, expiresAt };
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, key) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(key as Buffer);
    });
  });

  return crypto.timingSafeEqual(
    Buffer.from(storedHash, "hex"),
    Buffer.from(derivedKey.toString("hex"), "hex"),
  );
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, key) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(key as Buffer);
    });
  });

  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = parseToken(token);

  if (!payload) {
    return null;
  }

  const admins = await getAdmins();
  return admins.find((admin) => admin.username === payload.username) ?? null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

export async function requireAdminRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = parseToken(token);

  if (!payload) {
    return null;
  }

  const admins = await getAdmins();
  return admins.find((admin) => admin.username === payload.username) ?? null;
}

export const authCookieName = COOKIE_NAME;
