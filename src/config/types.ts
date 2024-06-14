export interface MdxMeta {
  title: string;
  date: string;
  desc: string;
  lastmod: string;
  thumbnail: string;
  lock: boolean;
  tags: string[];
}
export interface urlParams {
  category: string;
  subject: string;
  title: string;
  content: string;
}
export interface PostParams extends MdxMeta {
  content: string;
}
