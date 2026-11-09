import type { Metadata } from "next";
import { getTranslation, type Translation } from "./translations";
import {
  locales,
  translationLocales,
  localizePath,
  siteUrl,
  type Locale,
} from "./routing";
import { messages } from "./messages";
import { ImageUrl } from "@/lib/PostUtils/getImageUrl";

export const languageCode = (locale: Locale) =>
  locale === "zh" ? "zh-Hans" : locale;
export const openGraphLocale: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
};
export function pageLanguages(path: string) {
  return Object.fromEntries([
    ...locales.map((locale) => [
      languageCode(locale),
      siteUrl + localizePath(path, locale),
    ]),
    ["x-default", siteUrl + localizePath(path, "ko")],
  ]);
}
export function pageMetadata(locale: Locale, path: string): Metadata {
  const t = messages[locale];
  const label =
    path === "/"
      ? "PromleeBlog"
      : path.startsWith("/aboutme")
        ? t.about
        : path === "/sitemap-tree"
          ? t.sitemap
          : t.posts;
  const url = siteUrl + localizePath(path, locale);
  return {
    title: label === "PromleeBlog" ? label : `${label} | PromleeBlog`,
    description: t.intro,
    alternates: { canonical: url, languages: pageLanguages(path) },
    openGraph: {
      title: label,
      description: t.intro,
      url,
      siteName: "PromleeBlog",
      locale: openGraphLocale[locale],
      alternateLocale: locales
        .filter((value) => value !== locale)
        .map((value) => openGraphLocale[value]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: label,
      description: t.intro,
    },
  };
}
export async function articleLanguages(id: string, slug: string) {
  const original = `/blog/post/${slug}`;
  const languages: Record<string, string> = {
    ko: siteUrl + original,
    "x-default": siteUrl + original,
  };
  const available = await Promise.all(
    translationLocales.map(async (locale) => ({
      locale,
      translation: await getTranslation(id, locale),
    })),
  );
  for (const { locale, translation } of available)
    if (translation)
      languages[languageCode(locale)] =
        siteUrl + localizePath(original, locale);
  return languages;
}
export async function articleMetadata(
  post: {
    nameko: string;
    desc: string;
    thumbnail_url: string;
    init_date: string;
    mod_date: string;
    metatag?: string[];
  },
  slug: string,
  locale: Locale,
  translation?: Translation | null,
): Promise<Metadata> {
  const title = translation?.title || post.nameko;
  const description = translation?.description || post.desc;
  const url = siteUrl + localizePath(`/blog/post/${slug}`, locale);
  const languages = await articleLanguages(slug.split("-")[0], slug);
  const image =
    ImageUrl(post.thumbnail_url) ||
    `${siteUrl}/icons/android-chrome-512x512.png`;
  return {
    title: `${title} | PromleeBlog`,
    description,
    // The source keywords are Korean. Avoid publishing them on translated
    // pages until locale-specific keyword translations are available.
    keywords: locale === "ko" ? post.metatag : undefined,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: "PromleeBlog",
      locale: openGraphLocale[locale],
      alternateLocale: locales
        .filter((value) => value !== locale && languages[languageCode(value)])
        .map((value) => openGraphLocale[value]),
      type: "article",
      publishedTime: post.init_date,
      modifiedTime: post.mod_date,
      images: [{ url: image, alt: title }],
      tags: locale === "ko" ? post.metatag : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}
