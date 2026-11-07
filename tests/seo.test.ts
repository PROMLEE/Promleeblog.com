import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import matter from "gray-matter";
import { pageLanguages, articleMetadata } from "../src/lib/i18n/metadata";
import { sitemapXml } from "../src/lib/i18n/sitemap";
import { getTranslation } from "../src/lib/i18n/translations";

test("localized browse pages reciprocate all four languages",()=>{
 const languages=pageLanguages("/blog/programming");
 assert.deepEqual(Object.keys(languages).sort(),["en","ja","ko","x-default","zh-Hans"].sort());
 assert.equal(languages["zh-Hans"],"https://www.promleeblog.com/zh/blog/programming");
 assert.equal(languages["x-default"],languages.ko);
});
test("sitemap XML escapes paths and emits alternate language links",()=>{
 const xml=sitemapXml([{url:"https://www.promleeblog.com/en/blog?a=1&b=2",alternates:{languages:{en:"https://www.promleeblog.com/en/blog?a=1&b=2",ko:"https://www.promleeblog.com/blog"}}}]);
 assert.ok(xml.includes("a=1&amp;b=2"));
 assert.ok(xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'));
 assert.ok(xml.includes('hreflang="ko"'));
 assert.ok(!xml.includes("a=1&b=2"));
});
test("all article variants share the same alternates and keep self canonicals",async()=>{
 const previous=process.cwd();const temporary=await fs.mkdtemp(path.join(os.tmpdir(),"promlee-seo-"));
 const post={nameko:"원문",desc:"설명",thumbnail_url:"",init_date:"2024-04-20T00:00:00Z",mod_date:"2024-06-23T00:00:00Z"};
 try{
  process.chdir(temporary);
  for(const locale of ["en","ja","zh"] as const){
   await fs.mkdir(`content/translations/${locale}`,{recursive:true});
   await fs.writeFile(`content/translations/${locale}/109.mdx`,matter.stringify("Body",{post_id:"109",locale,title:"Title",description:"Description",source_hash:"a".repeat(64),reviewed_at:"2026-11-06T00:00:00.000Z"}));
  }
  const original=await articleMetadata(post,"109-example","ko");
  for(const locale of ["en","ja","zh"] as const){
   const metadata=await articleMetadata(post,"109-example",locale,await getTranslation("109",locale));
   assert.deepEqual(metadata.alternates?.languages,original.alternates?.languages);
   assert.equal(metadata.alternates?.canonical,`https://www.promleeblog.com/${locale}/blog/post/109-example`);
   assert.ok(metadata.openGraph);assert.ok(metadata.twitter);
  }
 }finally{process.chdir(previous);await fs.rm(temporary,{recursive:true,force:true});}
});
