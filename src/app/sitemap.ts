import { MetadataRoute } from "next";
import { CategoryKo } from "@/config/koname";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePath = "https://promleeblog.com/blog/";

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
      url: "https://promleeblog.com/blog/test",
    },
    {
      url: "https://promleeblog.com/sitemap.xml",
      lastModified: new Date(),
    },
  ];
  Object.keys(CategoryKo).map((category) => {
    list.push(putmap(category));
    Object.keys(CategoryKo[category].sub).map((sub) => {
      list.push(putmap(category + "/" + sub));
      Object.keys(CategoryKo[category].sub[sub].title).map((title) => {
        list.push(putmap(category + "/" + sub + "/" + title));
        Object.keys(CategoryKo[category].sub[sub].title[title].content).map(
          (content) => {
            list.push(
              putmap(category + "/" + sub + "/" + title + "/" + content),
            );
          },
        );
      });
    });
  });
  return list;
}
