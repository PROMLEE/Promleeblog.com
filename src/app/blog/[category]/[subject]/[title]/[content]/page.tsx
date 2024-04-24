import fs from "fs";
import matter from "gray-matter";
import { dbtable } from "@/config/types";
import { components } from "@/components/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
export interface Post extends dbtable {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  categoryPublicName: string;
}

interface params {
  category: string;
  subject: string;
  title: string;
  content: string;
}

type Props = {
  params: params;
};

const getPostDetail = async (params: params) => {
  const filePath = `${process.cwd()}/src/posts/${params.category}/${params.subject}/${params.title}/${params.content}.mdx`;
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

// For MySQL... Maybe Later...
// const getMarkdownsource = async () => {
//   const markdownsource: dbtable[] = await fetch(`${process.env.API_URL}/api`, {
//     cache: "no-store",
//   }).then((res) => res.json());
//   return markdownsource;
// };

const Post = async ({ params }: Props) => {
  const post = await getPostDetail(params);
  return (
    <>
      <div className="prose">
        <h2 className={"text-white"}>
          Category: {params.category.replace("%20", " ")}
        </h2>
        <h3 className={"text-white"}>
          Title: {params.title.replace("%20", " ")}
        </h3>
        <div className="">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkBreaks, remarkMath],
                rehypePlugins: [
                  [
                    // 이슈 존재 https://github.com/hashicorp/next-mdx-remote/issues/86
                    //@ts-ignore
                    rehypePrettyCode,
                  ],
                  //@ts-ignore
                  [rehypeKatex, { strict: false }],
                ],
              },
            }}
          />
        </div>

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
