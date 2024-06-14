import { Metadata } from "next";

export async function generateMetadata({}: {}): Promise<Metadata> {
  const baseUrl = "https://promleeblog.com";
  const flattenedPath = "sitemap";
  const thumbnail = "icons/android-chrome-512x512.png";
  const title = "PromleeBlog | Sitemap";
  const description = "Cytoscape Graph로 만든 Sitemap입니다. - PromleeBlog";
  const tags = ["Sitemap", "Cytoscape"];
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
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
