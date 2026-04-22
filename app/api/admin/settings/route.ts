import { NextRequest, NextResponse } from "next/server";

import { requireAdminRequest } from "@/lib/auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/content-store";
import { addMediaRecord } from "@/lib/media-library";
import { saveUploadedFile } from "@/lib/media";
import { getString } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const settings = await getSiteSettings();

  const fileValue = formData.get("logoFile");
  const file = fileValue instanceof File ? fileValue : null;
  const uploadedUrl = await saveUploadedFile(file, "logo");
  const logo = uploadedUrl || getString(formData.get("logo")) || settings.logo;

  if (uploadedUrl) {
    await addMediaRecord(uploadedUrl, "site logo");
  }

  settings.siteName = getString(formData.get("siteName"));
  settings.logo = logo;
  settings.tagline = getString(formData.get("tagline"));
  settings.seoTitle = getString(formData.get("seoTitle"));
  settings.seoDescription = getString(formData.get("seoDescription"));
  settings.contactEmail = getString(formData.get("contactEmail"));
  settings.footerText = getString(formData.get("footerText"));
  settings.footerBottomText = getString(formData.get("footerBottomText"));
  settings.socialLinks = Array.from({ length: 3 }, (_, index) => ({
    label: getString(formData.get(`socialLabel-${index}`)),
    url: getString(formData.get(`socialUrl-${index}`)),
  })).filter((item) => item.label || item.url);
  settings.pageContent = {
    journal: {
      eyebrow: getString(formData.get("journalEyebrow")),
      title: getString(formData.get("journalTitle")),
      subtitle: getString(formData.get("journalSubtitle")),
    },
    activities: {
      eyebrow: getString(formData.get("activitiesEyebrow")),
      title: getString(formData.get("activitiesTitle")),
      subtitle: getString(formData.get("activitiesSubtitle")),
      actionLabel: getString(formData.get("activitiesActionLabel")),
      actionHref: getString(formData.get("activitiesActionHref")),
    },
    services: {
      eyebrow: getString(formData.get("servicesEyebrow")),
      title: getString(formData.get("servicesTitle")),
      subtitle: getString(formData.get("servicesSubtitle")),
      actionLabel: getString(formData.get("servicesActionLabel")),
      actionHref: getString(formData.get("servicesActionHref")),
    },
    portfolio: {
      eyebrow: getString(formData.get("portfolioEyebrow")),
      title: getString(formData.get("portfolioTitle")),
      subtitle: getString(formData.get("portfolioSubtitle")),
    },
    contact: {
      eyebrow: getString(formData.get("contactEyebrow")),
      title: getString(formData.get("contactTitle")),
      subtitle: getString(formData.get("contactSubtitle")),
    },
  };

  await saveSiteSettings(settings);
  return NextResponse.redirect(new URL("/admin/settings?status=saved", request.url));
}
