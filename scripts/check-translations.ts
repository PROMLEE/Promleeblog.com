import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { translationLocales } from "../src/lib/i18n/routing";
import { assertMdxInvariants } from "./mdx-invariants";
import { sourceHash } from "../src/lib/i18n/source-hash";

const api = (
  process.env.TRANSLATION_SOURCE_URL || "https://www.promleeblog.com"
).replace(/\/$/, "");
async function json(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw Error(`Source API ${response.status}`);
  return (await response.json()).data;
}
const categories = await json(`${api}/api/post/links`);
type PostLink = { id: string; url: string; lock: boolean };
const posts: PostLink[] = [
  ...new Map<string, PostLink>(
    categories
      .flatMap((category: { Subject: { Series: { Post: PostLink[] }[] }[] }) =>
        category.Subject.flatMap((subject) =>
          subject.Series.flatMap((series) => series.Post),
        ),
      )
      .filter((post: PostLink) => !post.lock)
      .map((post: PostLink) => [String(post.id), post]),
  ).values(),
];
const missing: Record<string, string[]> = {};
const invalid: string[] = [];
let checked = 0;
const sources = new Map();
for (const locale of translationLocales) {
  missing[locale] = [];
  for (const post of posts) {
    const file = path.join("content/translations", locale, `${post.id}.mdx`);
    let raw: string;
    try {
      raw = await fs.readFile(file, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        missing[locale].push(String(post.id));
        continue;
      }
      throw error;
    }
    try {
      const { data, content } = matter(raw);
      if (
        String(data.post_id) !== String(post.id) ||
        data.locale !== locale ||
        !data.title?.trim() ||
        !data.description?.trim() ||
        !data.reviewed_at ||
        !content.trim()
      )
        throw Error("Incomplete metadata or content");
      let source = sources.get(String(post.id));
      if (!source) {
        source = await json(`${api}/api/post?post_id=${post.id}`);
        sources.set(String(post.id), source);
      }
      if (source.lock || sourceHash(source) !== data.source_hash)
        throw Error("Source is locked or has changed");
      assertMdxInvariants(source.posting || "", content);
      await serialize(content, {
        mdxOptions: { remarkPlugins: [remarkGfm, remarkMath] },
      });
      checked++;
    } catch (error) {
      invalid.push(
        `${locale}/${post.id}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
const remaining = Object.values(missing).reduce(
  (count, ids) => count + ids.length,
  0,
);
const report = {
  checkedAt: new Date().toISOString(),
  sourceCount: posts.length,
  expected: posts.length * translationLocales.length,
  validPublished: checked,
  remaining,
  missing,
  invalid,
};
await fs.mkdir(".translation-work", { recursive: true });
await fs.writeFile(
  ".translation-work/coverage.json",
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify(
    {
      sourceCount: posts.length,
      expected: report.expected,
      validPublished: checked,
      remaining,
      invalid,
      missingByLocale: Object.fromEntries(
        Object.entries(missing).map(([locale, ids]) => [locale, ids.length]),
      ),
    },
    null,
    2,
  ),
);
if (
  invalid.length ||
  (process.argv.includes("--require-complete") && remaining)
)
  process.exitCode = 1;
