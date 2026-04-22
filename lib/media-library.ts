import crypto from "crypto";

import { getMediaLibrary, saveMediaLibrary } from "@/lib/content-store";

export async function addMediaRecord(url: string, label: string) {
  if (!url) {
    return;
  }

  const items = await getMediaLibrary();
  items.unshift({
    id: crypto.randomUUID(),
    url,
    label,
    createdAt: new Date().toISOString(),
  });
  await saveMediaLibrary(items);
}
