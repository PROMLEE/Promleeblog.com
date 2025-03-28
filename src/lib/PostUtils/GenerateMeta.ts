import { MdxMeta } from "@/config/types/types";
const baseUrl = "https://promleeblog.com";
export const GenerateMeta = ({
  meta,
  param,
}: {
  meta: MdxMeta;
  param: string;
}) => {
  const title = `${meta.nameko} | PromleeBlog`;
  const description = meta.desc;
  const tags: string[] = [
    "PromleeBlog",
    "Promlee",
    "PromleeBlog.com",
    meta.nameko,
    meta.name,
    meta.desc,
    meta.url || "",
    ...(meta.metatag?.map((tag) => tag) || []),
  ];
  const thumbnail = meta.thumbnail_url || "icons/android-chrome-512x512.png";
  const flattenedPath = `blog/post/${param}`;
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
