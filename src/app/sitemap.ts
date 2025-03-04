import { PostService } from "@/config/apis";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePath = "https://www.promleeblog.com/blog/";
  const Links = await PostService().getLinks();
  const putmap = (url: string) => {
    return {
      url: basePath + url,
      lastModified: new Date(),
      // changeFrequency: "daily",
      // priority: 0.8,
    };
  };
  const list = [
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
  Links.map((category) => {
    list.push(putmap(category.url));
    category.Subject.map((sub) => {
      list.push(putmap(category.url + "/" + sub.url));
      sub.Series.map((series) => {
        series.Post.map((post) => {
          if (!post.lock) {
            list.push(putmap("post/" + post.id + "-" + post.url));
          }
        });
      });
    });
  });
  return list;
}
