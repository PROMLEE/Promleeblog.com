import "server-only";
import type { MetadataRoute } from "next";
import { PostService } from "@/config/apis";
import { TagsService } from "@/config/apis/service/tags";
import { getTranslations } from "./translations";
import {
  locales,
  translationLocales,
  localizePath,
  siteUrl,
  type Locale,
} from "./routing";
import { languageCode, pageLanguages } from "./metadata";
import { tagPath, taxonomyName } from "./taxonomy";

export async function localizedSitemap(
  onlyLocale?: Locale,
): Promise<MetadataRoute.Sitemap> {
  const [categories, tags, ...translationMaps] = await Promise.all([
    PostService().getLinks(),
    TagsService().getTags({ sort: "count" }),
    ...translationLocales.map((locale) => getTranslations(locale)),
  ]);
  const maps = new Map(
    translationLocales.map((locale, index) => [locale, translationMaps[index]]),
  );
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const addPage = (path: string) => {
    const languages = pageLanguages(path);
    for (const locale of onlyLocale ? [onlyLocale] : locales) {
      const url = siteUrl + localizePath(path, locale);
      entries.set(url, { url, alternates: { languages } });
    }
  };
  for (const path of ["/", "/blog", "/aboutme", "/sitemap-tree"]) addPage(path);
  for (const tag of tags) {
    const languages = Object.fromEntries([
      ...locales.map((locale) => [
        languageCode(locale),
        siteUrl + localizePath(tagPath(tag.id, taxonomyName(tag, locale)), locale),
      ]),
      [
        "x-default",
        siteUrl + localizePath(tagPath(tag.id, taxonomyName(tag, "ko")), "ko"),
      ],
    ]);
    for (const locale of onlyLocale ? [onlyLocale] : locales) {
      const url =
        siteUrl + localizePath(tagPath(tag.id, taxonomyName(tag, locale)), locale);
      entries.set(url, { url, alternates: { languages } });
    }
  }
  for (const category of categories) {
    addPage(`/blog/${category.url}`);
    for (const subject of category.Subject) {
      addPage(`/blog/${category.url}/${subject.url}`);
      for (const series of subject.Series)
        for (const post of series.Post) {
          if (post.lock) continue;
          const path = `/blog/post/${post.id}-${post.url}`;
          const languages: Record<string, string> = {
            ko: siteUrl + path,
            "x-default": siteUrl + path,
          };
          for (const locale of translationLocales)
            if (maps.get(locale)?.has(String(post.id)))
              languages[languageCode(locale)] =
                siteUrl + localizePath(path, locale);
          for (const locale of onlyLocale ? [onlyLocale] : locales) {
            if (locale !== "ko" && !maps.get(locale)?.has(String(post.id)))
              continue;
            const url = siteUrl + localizePath(path, locale);
            entries.set(url, {
              url,
              alternates: { languages },
              ...(locale !== "ko"
                ? {
                    lastModified: maps.get(locale)!.get(String(post.id))!
                      .reviewed_at,
                  }
                : {}),
            });
          }
        }
    }
  }
  return [...entries.values()];
}
const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
export function sitemapXml(entries: MetadataRoute.Sitemap) {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    entries
      .map((entry) => {
        const modified =
          entry.lastModified instanceof Date
            ? entry.lastModified.toISOString()
            : entry.lastModified;
        const alternates = Object.entries(entry.alternates?.languages || {})
          .map(
            ([language, url]) =>
              `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(String(url))}"/>`,
          )
          .join("");
        return `<url><loc>${escapeXml(entry.url)}</loc>${modified ? `<lastmod>${escapeXml(modified)}</lastmod>` : ""}${alternates}</url>`;
      })
      .join("") +
    "</urlset>"
  );
}
