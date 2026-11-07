import {test} from "node:test";
import assert from "node:assert/strict";
import {sourceCodeBlocks} from "../scripts/source-code-blocks";
import {assertMdxInvariants} from "../scripts/mdx-invariants";
test("four-backtick code and embedded triples are extracted as one block",()=>{
 const source='````md title="Sample"\n```js\nconst value = 1;\n```\n````';
 const blocks=sourceCodeBlocks(source);
 assert.equal(blocks.length,1);
 assert.equal(blocks[0].value,'```js\nconst value = 1;\n```');
 assert.doesNotThrow(()=>assertMdxInvariants(source,blocks[0].markdown));
});
test("tilde and list-indented code preserve language, metadata and payload",()=>{
 const source='- Example\n\n  ~~~js showLineNumbers\n  const value = 1;\n  ~~~';
 const [block]=sourceCodeBlocks(source);
 assert.equal(block.lang,"js");assert.equal(block.meta,"showLineNumbers");
 assert.doesNotThrow(()=>assertMdxInvariants(source,block.markdown));
});
