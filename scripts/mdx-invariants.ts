import { normalizedSourceMarkdown } from "./source-normalizations";
import matter from "gray-matter";
import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Node = {
  type: string;
  value?: string;
  lang?: string | null;
  meta?: string | null;
  url?: string;
  depth?: number;
  name?: string;
  attributes?: Attribute[];
  children?: Node[];
};
type Attribute = {
  type: string;
  name?: string;
  value?: string | { value?: string } | null;
};
const processor = createProcessor({ remarkPlugins: [remarkGfm, remarkMath] });
function fingerprint(source: string) {
  const tree = processor.parse(
    matter(normalizedSourceMarkdown(source)).content,
  ) as unknown as Node;
  const result = {
    code: [] as unknown[],
    inlineCode: [] as string[],
    links: [] as unknown[],
    components: [] as unknown[],
    math: [] as unknown[],
    headings: [] as unknown[],
  };
  function visit(node: Node) {
    if (node.type === "code")
      result.code.push([node.lang || "", node.meta || "", node.value]);
    if (node.type === "inlineCode") result.inlineCode.push(node.value || "");
    if (["link", "image", "definition"].includes(node.type))
      result.links.push([node.type, node.url]);
    if (node.type === "heading") result.headings.push(node.depth);
    if (["math", "inlineMath"].includes(node.type))
      result.math.push([node.type, node.value]);
    if (["mdxJsxFlowElement", "mdxJsxTextElement"].includes(node.type))
      result.components.push([
        node.name,
        (node.attributes || []).map((attribute) => [
          attribute.type,
          attribute.name,
          typeof attribute.value === "object"
            ? attribute.value?.value
            : ["alt", "title", "caption", "label", "aria-label"].includes(
                  attribute.name || "",
                )
              ? "translated text"
              : attribute.value,
        ]),
      ]);
    for (const child of node.children || []) visit(child);
  }
  visit(tree);
  // Grammar can reorder inline terms without changing their value or frequency.
  result.inlineCode.sort();
  return result;
}
export function assertMdxInvariants(source: string, translation: string) {
  const original = fingerprint(source),
    translated = fingerprint(translation);
  for (const key of Object.keys(original) as (keyof typeof original)[]) {
    if (JSON.stringify(original[key]) !== JSON.stringify(translated[key]))
      throw new Error(
        `Translation changed MDX ${key}; preserve code, URLs, components, formulas and heading levels.`,
      );
  }
}
