import { PostParams, MdxMeta } from "@/config/types/types";
import fs from "fs";
import matter from "gray-matter";

const getPostDetail = async () => {
  const filePath = `public/posts/contents.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
const parsePostDetail = async (postPath: string) => {
  console.log(postPath);
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);
  const grayMatter = data as MdxMeta;
  return { ...grayMatter, content };
};
const parsePost = async (postPath: string): Promise<PostParams> => {
  const postDetail = await parsePostDetail(postPath);
  return { ...postDetail };
};

export { getPostDetail };
