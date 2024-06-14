import { MdxMeta, urlParams } from "@/config/types/types";
const baseUrl = "https://promleeblog.com";
export const GenerateMeta = ({
  meta,
  params,
}: {
  meta: MdxMeta;
  params: urlParams;
}) => {
  const title = `PromleeBlog | ${meta.title}`;
  const description = meta.desc;
  const tags = meta.tags;
  const thumbnail = meta.thumbnail;
  const flattenedPath = `blog/${params.category}/${params.subject}/${params.title}/${params.content}`;
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
        url:
          `${baseUrl}/${thumbnail}` ||
          `${baseUrl}/icons/android-chrome-512x512.png`,
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
        url:
          `${baseUrl}/${thumbnail}` ||
          `${baseUrl}/icons/android-chrome-512x512.png`,
        alt: "Post Image",
      },
    },
  };
};
