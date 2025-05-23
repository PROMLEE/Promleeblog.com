import React from "react";
import { Components } from "@/components/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "katex/dist/katex.min.css";

export const MdxBody = ({
  content,
  isDev,
}: {
  content: string;
  isDev?: boolean;
}) => {
  return (
    <MDXRemote
      source={content === "" ? "no contents 😿" : content}
      components={Components(isDev)}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks, remarkMath],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                defaultLangauge: "plaintext",
                keepBackground: true,
                showLineNumbers: true,
                theme: "github-dark",
              },
            ],
            [
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
                properties: { className: ["anchor"] },
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
