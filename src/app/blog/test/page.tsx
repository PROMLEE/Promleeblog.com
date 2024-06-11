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
import rehypeSlug from "rehype-slug";
import RightSidebarComp from "@/components/bars/RightSidebar";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
export interface Post extends dbtable {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  categoryPublicName: string;
}

const getPostDetail = async () => {
  const filePath = `${process.cwd()}/src/Dump/Test/Test/Test/01.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
const parsePostDetail = async (postPath: string) => {
  console.log(postPath);
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

const Post = async () => {
  const post = await getPostDetail();
  return (
    <>
      <Toup />
      <div className="prose mt-10 scroll-smooth">
        <RightSidebarComp content={post.content} />
        <Suspense fallback={<div>Loading...</div>}>
          <MDXRemote
            source={post.content === "" ? "no contents 😿" : post.content}
            //@ts-ignore
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
                  [
                    //@ts-ignore
                    rehypeKatex,
                    {
                      colorIsTextColor: true,
                      strict: false,
                      macros: {
                        // issue from google fonts
                        "\\neq": "\\mathrel{\\char`≠}",
                      },
                    },
                  ],
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "append",
                      properties: {
                        className: ["anchor"],
                      },
                      content: {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["icon", "icon-link"] },
                        children: [{ type: "text", value: "🔗" }],
                      },
                    },
                  ],
                ],
              },
            }}
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
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
