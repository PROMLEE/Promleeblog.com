import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import { components } from "@/components/mdx";
import { dbtable } from "@/config/types";
import matter from "gray-matter";
export interface Post extends dbtable {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  categoryPublicName: string;
}
type Props = {
  params: {
    category: string;
    title: string;
  };
};

const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${process.cwd()}/src/posts/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);
  const grayMatter = data as dbtable;
  return { ...grayMatter, content };
};
const parsePost = async (postPath: string): Promise<any> => {
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postDetail,
  };
};
const Post = async ({ params }: Props) => {
  // const markdownsource: dbtable[] = await fetch(`${process.env.API_URL}/api`, {
  //   cache: "no-store",
  // }).then((res) => res.json());
  // const markdownsource = fs.readFileSync(
  //   `${process.cwd()}/src/posts/${params.category}/${params.title}/content.mdx`,
  //   // "utf8",
  // );
  const post = await getPostDetail(params.category, params.title);
  return (
    <>
      <div className="prose w-full">
        <h2 className={"text-white"}>
          Category: {params.category.replace("%20", " ")}
        </h2>
        <h3 className={"text-white"}>
          Title: {params.title.replace("%20", " ")}
        </h3>
        <MDXRemote
          source={post.content}
          components={components}
          options={{ parseFrontmatter: true }}
        />
        {/*For MySQL... Maybe Later...*/}
        {/*{markdownsource.map((data: dbtable, idx: any) => (*/}
        {/*  <div key={idx}>*/}
        {/*    <h1 className={"text-pink-600 hover:text-amber-500"}>*/}
        {/*      {data.title}*/}
        {/*    </h1>*/}
        {/*    <p>{data.description}</p>*/}
        {/*    <p>{data.date.toString()}</p>*/}
        {/*    <p>{data.thumbnail}</p>*/}
        {/*    <MDXRemote*/}
        {/*      source={data.content}*/}
        {/*      components={MyComponents}*/}
        {/*      options={{ parseFrontmatter: true }}*/}
        {/*    />*/}
        {/*    <br />*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </>
  );
};
export default Post;
