import { rehypeHeadingAliases } from "@/lib/i18n/heading-aliases";
import React from "react";
import { atag } from "@/components/mdx/defaulttags";
import {
  koreanArticleUrl,
  translatedArticlePaths,
} from "@/lib/i18n/article-links";
import type { Locale } from "@/lib/i18n/routing";
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

export const MdxBody = async ({
  content,
  isDev,
  originalContent,
  locale = "ko",
}: {
  content: string;
  isDev?: boolean;
  originalContent?: string;
  locale?: Locale;
}) => {
  const components = Components(isDev);
  if (locale !== "ko") {
    const paths = await translatedArticlePaths(content, locale);
    components.a = (props: Parameters<typeof atag>[0]) => {
      const url = props.href && koreanArticleUrl(props.href);
      if (!url) return atag(props);
      return atag({
        ...props,
        href: url.pathname + url.search + url.hash,
        preserveLanguage: !paths.has(url.pathname),
      });
    };
  }
  return (
    <MDXRemote
      source={content === "" ? "no contents 😿" : content}
      components={components}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks, remarkMath],
          rehypePlugins: [
            [rehypePrettyCode],
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
            [rehypeHeadingAliases, { source: originalContent }],
            [
              rehypeAutolinkHeadings,
              {
                behavior: "append",
                properties: { className: ["anchor"] },
                content: {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["icon", "icon-link"] },
                  children: [{ type: "text", value: " 🔗" }],
                },
              },
            ],
          ],
        },
      }}
    />
  );
};
