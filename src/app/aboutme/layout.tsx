import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://promleeblog.com";
  const flattenedPath = "aboutme";
  const thumbnail = "icons/android-chrome-512x512.png";
  const title = "PromleeBlog | About Me";
  const description =
    "도전을 두려워 않는 개발자 이동훈의 포트폴리오입니다. - PromleeBlog";
  const tags = [
    "About Me",
    "Portfolio",
    "포트폴리오",
    "풀스택",
    "개발자",
    "이동훈",
  ];
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
