import { pageLanguages } from "@/lib/i18n/metadata";
const baseUrl = "https://www.promleeblog.com";

interface params {
  category: string;
  subject?: string;
}

export const GenerateMeta = ({
  meta,
  params,
}: {
  meta: PostResponse.GetSeriesList["data"];
  params: params;
}) => {
  const title = `PromleeBlog | ${meta.nameko}`;
  const description = `${meta.nameko} 시리즈에 대한 포스트 목록입니다.`;
  const tags: string[] = [
    "PromleeBlog",
    "Promlee",
    "PromleeBlog.com",
    meta.nameko,
    ...meta.Series.map((item) => item.nameko),
  ];
  const thumbnail = "icons/android-chrome-512x512.png";
  const flattenedPath = params.subject
    ? `blog/${params.category}/${params.subject}`
    : params.category ? `blog/${params.category}` : "blog";
  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/${flattenedPath}`, languages: pageLanguages(`/${flattenedPath}`) },
    keywords: tags,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${flattenedPath}`,
      siteName: "PromleeBlog",
      images: { url: `${baseUrl}/${thumbnail}`, alt: "Post Image" },
      locale: "ko_KR",
      type: "article",
      tags,
    },
    twitter: {
      card: "summary_large_image",
      creator: "PromleeBlog",
      title,
      description,
      images: { url: `${baseUrl}/${thumbnail}`, alt: "Post Image" },
    },
  };
};
