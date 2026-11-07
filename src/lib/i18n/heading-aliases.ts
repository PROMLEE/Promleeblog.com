import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Node = {
  type: string;
  tagName?: string;
  depth?: number;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};
const parser = createProcessor({ remarkPlugins: [remarkGfm, remarkMath] });
const text = (node: Node): string =>
  node.value ?? node.children?.map(text).join("") ?? "";
export function originalHeadingIds(source: string) {
  const slugs = new GithubSlugger();
  const ids: string[] = [];
  function walk(node: Node) {
    if (node.type === "heading") ids.push(slugs.slug(text(node)));
    for (const child of node.children || []) walk(child);
  }
  walk(parser.parse(matter(source).content) as unknown as Node);
  return ids;
}

// Keep original in-article fragment URLs working after heading translation.
// Explicit translated heading IDs remain the canonical visible heading IDs.
export function rehypeHeadingAliases({ source }: { source?: string } = {}) {
  const aliases = source ? originalHeadingIds(source) : [];
  return function (tree: Node) {
    if (!aliases.length) return;
    const used = new Set<string>();
    const headings: Node[] = [];
    function collect(node: Node) {
      if (typeof node.properties?.id === "string") used.add(node.properties.id);
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName || ""))
        headings.push(node);
      for (const child of node.children || []) collect(child);
    }
    collect(tree);
    // Legacy malformed source fences may hide headings; never map by a wrong offset.
    if (headings.length !== aliases.length) return;
    const ids = new Map(
      headings.map((heading, index) => [heading, aliases[index]]),
    );
    function insert(parent: Node) {
      const children = parent.children;
      if (!children) return;
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        const id = ids.get(child);
        if (id && !used.has(id)) {
          children.splice(index, 0, {
            type: "element",
            tagName: "span",
            properties: {
              id,
              ariaHidden: true,
              className: ["block", "h-0", "scroll-mt-16"],
            },
            children: [],
          });
          used.add(id);
          index++;
        }
        insert(child);
      }
    }
    insert(tree);
  };
}
