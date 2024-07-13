import { MdxMeta } from "@/config/types/types";
const baseUrl = "https://promleeblog.com";

interface params {
  category: string;
  subject?: string;
}

export const GenerateMeta = ({
  meta,
  params,
}: {
  meta: MdxMeta;
  params: params;
}) => {
  const title = `PromleeBlog | ${meta.nameko}`;
  const description = meta.desc;
  const tags: string[] = [
    "PromleeBlog",
    "Promlee",
    "PromleeBlog.com",
    meta.nameko,
    meta.name,
    meta.url,
  ];
  const thumbnail = meta.thumbnail_url || "icons/android-chrome-512x512.png";
  const flattenedPath = params.subject
    ? `blog/${params.category}/${params.subject}`
    : `blog/${params.category}`;
  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${flattenedPath}`,
      siteName: "PromleeBlog",
      images: {
        url: `${baseUrl}/${thumbnail}`,
        alt: "Post Image",
      },
      locale: "ko_KR",
      type: "article",
      tags,
    },
    twitter: {
      card: "summary_large_image",
      creator: "PromleeBlog",
      title,
      description,
      images: {
        url: `${baseUrl}/${thumbnail}`,
        alt: "Post Image",
      },
    },
  };
};
