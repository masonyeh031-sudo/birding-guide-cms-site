import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(
  file: File | null,
  prefix: string,
) {
  if (!file || file.size === 0) {
    return "";
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = path.extname(file.name) || ".bin";
  const safePrefix = prefix.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const filename = `${safePrefix}-${Date.now()}-${crypto.randomUUID()}${extension}`;

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

export async function saveUploadedFiles(files: File[], prefix: string) {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const uploadedUrl = await saveUploadedFile(file, prefix);
    if (uploadedUrl) {
      uploadedUrls.push(uploadedUrl);
    }
  }

  return uploadedUrls;
}

export async function deleteUploadedFile(url: string) {
  if (!url.startsWith("/uploads/")) {
    return;
  }

  const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));

  try {
    await fs.unlink(filePath);
  } catch {
    // Ignore missing files to keep delete operations idempotent.
  }
}
