import type { MetadataRoute } from "next";
import { siteUrl, translationLocales } from "@/lib/i18n/routing";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      ...translationLocales.map((locale) => `${siteUrl}/${locale}/sitemap.xml`),
    ],
  };
}
