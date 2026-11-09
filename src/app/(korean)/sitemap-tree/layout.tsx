import { pageMetadata } from "@/lib/i18n/metadata";
import { siteUrl } from "@/lib/i18n/routing";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = siteUrl;
  const path = "/sitemap-tree";
  const thumbnail = "icons/android-chrome-512x512.png";
  const title = "PromleeBlog | Sitemap";
  const description = "Cytoscape Graph로 만든 Sitemap입니다. - PromleeBlog";
  const tags = ["Sitemap", "Cytoscape"];
  return {
    ...pageMetadata("ko", path, { title, description }),
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
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
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
