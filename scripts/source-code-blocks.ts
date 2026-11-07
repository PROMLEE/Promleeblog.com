import matter from "gray-matter";
import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { normalizedSourceMarkdown } from "./source-normalizations";

type Node={type:string;value?:string;lang?:string|null;meta?:string|null;position?:{start:{offset?:number};end:{offset?:number}};children?:Node[]};
const parser=createProcessor({remarkPlugins:[remarkGfm,remarkMath]});
export function sourceCodeBlocks(source:string) {
  const body=matter(normalizedSourceMarkdown(source)).content;
  const tree=parser.parse(body) as unknown as Node;
  const blocks:{raw:string;markdown:string;value:string;lang:string;meta:string}[]=[];
  function visit(node:Node){
    if(node.type==="code"){
      const value=node.value||"";
      const raw=body.slice(node.position?.start.offset,node.position?.end.offset);
      // Re-fencing changes only Markdown delimiters. Code, language and metadata
      // remain exact; longer fences safely contain any literal backtick runs.
      const longest=Math.max(0,...[...value.matchAll(/`+/g)].map(match=>match[0].length));
      const opening=raw.match(/^(`{3,})/);
      const fence="`".repeat(Math.max(3,longest+1,opening?.[1].length||0));
      const lang=node.lang||"",meta=node.meta||"";
      const markdown=`${fence}${lang}${meta?` ${meta}`:""}\n${value}\n${fence}`;
      blocks.push({raw,markdown,value,lang,meta});
    }
    for(const child of node.children||[])visit(child);
  }
  visit(tree);return blocks;
}
