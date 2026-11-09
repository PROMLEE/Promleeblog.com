import type { Locale } from "./routing";

type TaxonomyName = {
  name: string;
  nameko?: string | null;
  name_en?: string | null;
  name_ja?: string | null;
  name_zh?: string | null;
};

export function taxonomyName(item: TaxonomyName, locale: Locale) {
  if (locale === "ko") return item.nameko || item.name;
  if (locale === "en") return item.name_en || item.name;
  if (locale === "ja") return item.name_ja || item.name_en || item.name;
  return item.name_zh || item.name_en || item.name;
}

export function taxonomyDescription(name: string, locale: Locale) {
  if (locale === "ko") return `${name} 관련 글을 모았습니다.`;
  if (locale === "ja") return `${name}に関する記事一覧です。`;
  if (locale === "zh") return `浏览${name}相关的文章。`;
  return `Browse articles about ${name}.`;
}

export function tagPath(id: string | number, label: string) {
  const slug = label.trim().replace(/\s+/g, "-").replace(/-+/g, "-");
  return `/tags/${id}-${encodeURIComponent(slug || String(id))}`;
}
