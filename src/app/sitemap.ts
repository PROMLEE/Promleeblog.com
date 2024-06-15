import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePath = "https://promleeblog.com/blog/";
  let Links: any;
  try {
    Links = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`,
      { next: { revalidate: 60 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    Links = [];
  }
  const putmap: any = (url: string) => {
    return {
      url: basePath + url,
      lastModified: new Date(),
      // changeFrequency: "daily",
      // priority: 0.8,
    };
  };
  var list: any[] = [
    {
      url: "https://promleeblog.com",
      lastModified: new Date(),
      // changeFrequency: 'daily',
      // priority: 0.8,
      // alternates: {
      //   languages: {
      //     es: 'https://promleeblog.com/es',
      //     en: 'https://promleeblog.com/en',
      //   }
      // }
    },
    {
      url: "https://promleeblog.com/aboutme",
      lastModified: new Date(),
    },
    {
      url: "https://promleeblog.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://promleeblog.com/test",
    },
    {
      url: "https://promleeblog.com/sitemap",
      lastModified: new Date(),
    },
    {
      url: "https://promleeblog.com/sitemap.xml",
      lastModified: new Date(),
    },
  ];
  Links.map((category: any) => {
    list.push(putmap(category.url));
    category.Subject.map((sub: any) => {
      list.push(putmap(category.url + "/" + sub.url));
      sub.Series.map((series: any) => {
        series.Post.map((post: any) => {
          list.push(
            putmap(
              category.url + "/" + sub.url + "/" + post.id.padStart(2, "0"),
            ),
          );
        });
      });
    });
  });
  return list;
}
