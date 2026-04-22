import { HomePage } from "@/components/home/home-page";
import {
  getGalleryItems,
  getHomepageSectionMap,
  getSiteSettings,
} from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string }>;
}) {
  const query = await searchParams;
  const [settings, sections, galleryItems] = await Promise.all([
    getSiteSettings(),
    getHomepageSectionMap(),
    getGalleryItems(),
  ]);

  return (
    <HomePage
      settings={settings}
      sections={sections}
      galleryItems={galleryItems}
      subscribed={query.subscribed === "1"}
    />
  );
}
