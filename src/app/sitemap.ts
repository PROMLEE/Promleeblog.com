import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePath = "https://www.promleeblog.com/blog/";
  let Links: any;
  try {
    Links = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`,
      { next: { revalidate: 3600 } },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return data.data;
        } else {
          throw new Error("Links not found");
        }
      });
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
      url: "https://www.promleeblog.com",
      lastModified: new Date(),
      // changeFrequency: 'daily',
      // priority: 0.8,
      // alternates: {
      //   languages: {
      //     es: 'https://www.promleeblog.com/es',
      //     en: 'https://www.promleeblog.com/en',
      //   }
      // }
    },
    {
      url: "https://www.promleeblog.com/aboutme",
      lastModified: new Date(),
    },
    {
      url: "https://www.promleeblog.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://www.promleeblog.com/sitemap",
      lastModified: new Date(),
    },
  ];
  Links.map((category: any) => {
    list.push(putmap(category.url));
    category.Subject.map((sub: any) => {
      list.push(putmap(category.url + "/" + sub.url));
      sub.Series.map((series: any) => {
        series.Post.map((post: any) => {
          post.lock || list.push(putmap("post/" + post.id + "-" + post.url));
        });
      });
    });
  });
  return list;
}
