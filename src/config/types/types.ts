export interface MdxMeta {
  name: string;
  nameko: string;
  desc: string;
  thumbnail_url: string;
  init_date: string;
  mod_date: string;
  url?: string;
}
export interface urlParams {
  post: string;
}
export interface PostParams extends MdxMeta {
  content: string;
}
