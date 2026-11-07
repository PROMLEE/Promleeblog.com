import { test } from "node:test";
import assert from "node:assert/strict";
import { originalHeadingIds, rehypeHeadingAliases } from "../src/lib/i18n/heading-aliases";

test("source heading aliases ignore code and handle duplicate headings",()=>{
 const ids=originalHeadingIds('## 제목\n\n```md\n## 코드 내부\n```\n\n## 제목');
 assert.deepEqual(ids,["제목","제목-1"]);
});
test("original anchors sit beside translated headings without duplicate IDs",()=>{
 const tree={type:"root",children:[{type:"element",tagName:"h2",properties:{id:"heading"},children:[{type:"text",value:"Heading"}]}]};
 rehypeHeadingAliases({source:"## 제목"})(tree);
 assert.equal(tree.children.length,2);
 assert.equal(tree.children[0].properties.id,"제목");
 assert.equal(tree.children[1].properties.id,"heading");
 const same={type:"root",children:[{type:"element",tagName:"h2",properties:{id:"react"},children:[]}]};
 rehypeHeadingAliases({source:"## React"})(same);
 assert.equal(same.children.length,1);
});
