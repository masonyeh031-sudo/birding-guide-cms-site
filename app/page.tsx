import { WixHomePage } from "@/components/home/wix-home-page";
import { getHomepageSectionMap, getSiteSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ subscribed?: string }>;
}) {
  const [sections, settings] = await Promise.all([
    getHomepageSectionMap(),
    getSiteSettings(),
  ]);

  const resolvedParams = (await searchParams) ?? {};
  const subscribed = resolvedParams.subscribed === "1";

  return <WixHomePage settings={settings} sections={sections} subscribed={subscribed} />;
}
