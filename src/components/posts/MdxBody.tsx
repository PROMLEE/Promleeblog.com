/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { components } from "@/components/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "katex/dist/katex.min.css";

export const MdxBody = ({ content }: { content: string }) => {
  return (
    <MDXRemote
      source={content === "" ? "no contents 😿" : content}
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
  );
};
