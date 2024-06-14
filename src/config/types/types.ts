export interface MdxMeta {
  title: string;
  title_num: number;
  subtitle: string;
  subtitle_num: number;
  desc: string;
  lock: boolean;
  tags: string[];
  date: Date;
  lastmod: Date;
  thumbnail: string;
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
