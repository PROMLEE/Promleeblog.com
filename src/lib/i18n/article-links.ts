import "server-only";
import prisma from "@/lib/prisma";
import { siteUrl, type TranslationLocale } from "./routing";

export async function translatedArticlePaths(
  content: string,
  locale: TranslationLocale,
) {
  const ids = [
    ...new Set(
      Array.from(
        content.matchAll(/\/blog\/post\/([1-9]\d{0,18})-/g),
        ([, id]) => BigInt(id),
      ),
    ),
  ].filter((id) => id <= BigInt("9223372036854775807"));
  if (!ids.length) return new Set<string>();

  const posts = await prisma.post.findMany({
    where: {
      id: { in: ids },
      lock: false,
      translations: {
        some: { locale, status: "published", reviewed_at: { not: null } },
      },
    },
    select: { id: true, url: true },
  });
  return new Set(posts.map(({ id, url }) => `/blog/post/${id}-${url}`));
}

export function koreanArticleUrl(href: string) {
  if (!href.startsWith("/") && !/^https?:\/\//i.test(href)) return;
  try {
    const url = new URL(href, siteUrl);
    if (
      ["www.promleeblog.com", "promleeblog.com"].includes(url.hostname) &&
      /^\/blog\/post\/[1-9]\d*-/.test(url.pathname)
    )
      return url;
  } catch {
    return;
  }
}
