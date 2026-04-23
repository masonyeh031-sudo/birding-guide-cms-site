import { BirdGuideRebuild } from "@/components/birds/bird-guide-rebuild";
import { getBirds } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const birds = await getBirds();

  return <BirdGuideRebuild birds={birds} />;
}
