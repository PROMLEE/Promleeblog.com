import { MdxMeta, urlParams } from "@/config/types/types";
const baseUrl = "https://promleeblog.com";
export const GenerateMeta = ({
  meta,
  params,
}: {
  meta: MdxMeta;
  params: urlParams;
}) => {
  const title = `PromleeBlog | ${meta.nameko}`;
  const description = meta.desc;
  const tags: any = ["PromleeBlog", "Promlee", "Blog", "PromleeBlog.com"];
  const thumbnail = meta.thumbnail_url || "icons/android-chrome-512x512.png";
  const flattenedPath = `blog/${params.category}/${params.subject}/${params.post}`;
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
