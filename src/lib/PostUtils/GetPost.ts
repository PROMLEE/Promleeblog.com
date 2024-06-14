import { PostParams, MDXMeta, urlParams } from "@/config/types";
import fs from "fs";
import matter from "gray-matter";

const getPostDetail = async (params: urlParams) => {
  const filePath = `${process.cwd()}/src/posts/${params.category}/${params.subject}/${params.title}/${params.content}.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
const parsePostDetail = async (postPath: string) => {
  console.log(postPath);
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);
  const grayMatter = data as MDXMeta;
  return { ...grayMatter, content };
};
const parsePost = async (postPath: string): Promise<PostParams> => {
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postDetail,
  };
};

export { getPostDetail };
