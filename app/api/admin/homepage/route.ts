import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getHomepageSections, saveHomepageSections } from "@/lib/content-store";
import { addMediaRecord } from "@/lib/media-library";
import { saveUploadedFile, saveUploadedFiles } from "@/lib/media";
import { getString } from "@/lib/utils";
import type {
  FlowItem,
  HomepageSectionKey,
  NewsItem,
  SeriesItem,
  ShowcaseImage,
  StatItem,
} from "@/lib/types";

function homepageRedirect(request: NextRequest) {
  return NextResponse.redirect(new URL("/admin/homepage?status=saved", request.url));
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const sectionKey = getString(formData.get("sectionKey")) as HomepageSectionKey;
  const sections = await getHomepageSections();
  const target = sections.find((section) => section.sectionKey === sectionKey);

  if (!target) {
    return homepageRedirect(request);
  }

  const now = new Date().toISOString();
  // 讀取「是否顯示於前台」開關，表單未傳時視為隱藏
  target.visible = getString(formData.get("visible")) === "1";

  if (sectionKey === "hero" || sectionKey === "about") {
    const fileValue = formData.get("imageFile");
    const file = fileValue instanceof File ? fileValue : null;
    const uploadedUrl = await saveUploadedFile(file, sectionKey);
    const image = uploadedUrl || getString(formData.get("image")) || target.image;

    if (uploadedUrl) {
      await addMediaRecord(uploadedUrl, `${sectionKey} image`);
    }

    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.content = getString(formData.get("content"));
    target.image = image;
    if (sectionKey === "hero") {
      target.extraJson = {
        primaryButtonLabel: getString(formData.get("primaryButtonLabel")),
        primaryButtonHref: getString(formData.get("primaryButtonHref")),
        secondaryButtonLabel: getString(formData.get("secondaryButtonLabel")),
        secondaryButtonHref: getString(formData.get("secondaryButtonHref")),
      };
    }
    target.updatedAt = now;
  }

  if (sectionKey === "news") {
    const items: NewsItem[] = Array.from({ length: 3 }, (_, index) => ({
      id: getString(formData.get(`newsId-${index}`)) || `news-${index + 1}`,
      date: getString(formData.get(`newsDate-${index}`)),
      time: getString(formData.get(`newsTime-${index}`)),
      location: getString(formData.get(`newsLocation-${index}`)),
      title: getString(formData.get(`newsTitle-${index}`)),
      summary: getString(formData.get(`newsSummary-${index}`)),
      buttonLabel: getString(formData.get(`newsButtonLabel-${index}`)),
      href: getString(formData.get(`newsHref-${index}`)),
    }));

    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.extraJson = {
      buttonLabel: getString(formData.get("buttonLabel")),
      buttonHref: getString(formData.get("buttonHref")),
      items,
    };
    target.updatedAt = now;
  }

  if (sectionKey === "stats") {
    const items: StatItem[] = Array.from({ length: 3 }, (_, index) => ({
      id: getString(formData.get(`statId-${index}`)) || `stat-${index + 1}`,
      icon: getString(formData.get(`statIcon-${index}`)),
      title: getString(formData.get(`statTitle-${index}`)),
      content: getString(formData.get(`statContent-${index}`)),
      value: getString(formData.get(`statValue-${index}`)),
    }));

    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.extraJson = { items };
    target.updatedAt = now;
  }

  if (sectionKey === "flow") {
    const items: FlowItem[] = await Promise.all(
      Array.from({ length: 4 }, (_, index) => index).map(async (index) => {
        const fileValue = formData.get(`flowImageFile-${index}`);
        const file = fileValue instanceof File ? fileValue : null;
        const uploadedUrl = await saveUploadedFile(file, `flow-${index + 1}`);
        if (uploadedUrl) {
          await addMediaRecord(uploadedUrl, `flow image ${index + 1}`);
        }
        return {
          id: getString(formData.get(`flowId-${index}`)) || `flow-${index + 1}`,
          step: getString(formData.get(`flowStep-${index}`)),
          title: getString(formData.get(`flowTitle-${index}`)),
          content: getString(formData.get(`flowContent-${index}`)),
          image: uploadedUrl || getString(formData.get(`flowImage-${index}`)),
        };
      }),
    );

    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.extraJson = {
      buttonLabel: getString(formData.get("buttonLabel")),
      buttonHref: getString(formData.get("buttonHref")),
      items,
    };
    target.updatedAt = now;
  }

  if (sectionKey === "showcase") {
    const imageIndexes = Array.from(formData.keys())
      .map((key) => {
        const matched = key.match(/^showcaseId-(\d+)$/);
        return matched ? Number(matched[1]) : null;
      })
      .filter((value): value is number => value !== null)
      .sort((left, right) => left - right);

    const images: ShowcaseImage[] = imageIndexes.map((index) => ({
      id: getString(formData.get(`showcaseId-${index}`)) || `show-${index + 1}`,
      title: getString(formData.get(`showcaseTitle-${index}`)),
      image: getString(formData.get(`showcaseImage-${index}`)),
    }));
    const uploadedFiles = formData
      .getAll("showcaseFiles")
      .filter((value): value is File => value instanceof File && value.size > 0);
    const uploadedUrls = await saveUploadedFiles(uploadedFiles, "showcase");

    for (const uploadedUrl of uploadedUrls) {
      await addMediaRecord(uploadedUrl, "showcase image");
      images.push({
        id: `show-${images.length + 1}`,
        title: `導覽照片 ${images.length + 1}`,
        image: uploadedUrl,
      });
    }

    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.content = getString(formData.get("content"));
    target.extraJson = { images: images.filter((image) => image.image.trim()) };
    target.updatedAt = now;
  }

  if (sectionKey === "series") {
    const items: SeriesItem[] = Array.from({ length: 2 }, (_, index) => ({
      id: getString(formData.get(`seriesId-${index}`)) || `series-${index + 1}`,
      title: getString(formData.get(`seriesTitle-${index}`)),
      description: getString(formData.get(`seriesDescription-${index}`)),
      image: getString(formData.get(`seriesImage-${index}`)),
      href: getString(formData.get(`seriesHref-${index}`)),
    }));

    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.extraJson = { items };
    target.updatedAt = now;
  }

  if (sectionKey === "subscribe") {
    target.title = getString(formData.get("title"));
    target.subtitle = getString(formData.get("subtitle"));
    target.extraJson = {
      placeholder: getString(formData.get("placeholder")),
      buttonLabel: getString(formData.get("buttonLabel")),
      successMessage: getString(formData.get("successMessage")),
    };
    target.updatedAt = now;
  }

  await saveHomepageSections(sections);
  return homepageRedirect(request);
}
