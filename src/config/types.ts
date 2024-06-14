export interface MDXMeta {
  title: String;
  date: String;
  lastmod: String;
  thumbnail: String;
}
export interface urlParams {
  category: string;
  subject: string;
  title: string;
  content: string;
}
export interface PostParams extends MDXMeta {
  content: string;
}
