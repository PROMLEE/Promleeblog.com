import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { assertMdxInvariants } from "./mdx-invariants";
import { sourceHash } from "../src/lib/i18n/source-hash";
import { isTranslationLocale } from "../src/lib/i18n/routing";

const [command, id, locale] = process.argv.slice(2);
if (
  !/^[1-9]\d*$/.test(id ?? "") ||
  !isTranslationLocale(locale ?? "") ||
  !["prepare", "publish"].includes(command)
) {
  throw new Error(
    "Usage: npm run translation -- prepare|publish POST_ID en|ja|zh [--reviewed]",
  );
}
const directory = path.join(process.cwd(), "content/translations", locale);
const draftPath = path.join(directory, `${id}.draft.mdx`);
const api = (
  process.env.TRANSLATION_SOURCE_URL || "https://www.promleeblog.com"
).replace(/\/$/, "");
async function loadSource() {
  const response = await fetch(`${api}/api/post?post_id=${id}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(`Source request failed: ${response.status}`);
  const { data } = await response.json();
  return z
    .object({
      nameko: z.string(),
      desc: z.string().nullable(),
      posting: z.string().nullable(),
      lock: z.boolean().nullable(),
    })
    .parse(data);
}
const source = await loadSource();
await fs.mkdir(directory, { recursive: true });
if (command === "prepare") {
  const metadata = {
    post_id: id,
    locale,
    title: "",
    description: "",
    source_hash: sourceHash(source),
  };
  await fs.writeFile(draftPath, matter.stringify("", metadata), { flag: "wx" });
  await fs.writeFile(
    path.join(directory, `${id}.source.json`),
    JSON.stringify(source, null, 2),
  );
  console.log(
    `Draft created: ${draftPath}. Translate the source snapshot; the draft is not public.`,
  );
} else {
  if (!process.argv.includes("--reviewed"))
    throw new Error(
      "Publishing requires --reviewed after checking the translation.",
    );
  const { data, content } = matter(await fs.readFile(draftPath, "utf8"));
  const metadata = z
    .object({
      post_id: z.literal(id),
      locale: z.literal(locale),
      title: z.string().trim().min(1),
      description: z.string().trim().min(1),
      source_hash: z.string(),
    })
    .parse(data);
  if (!content.trim()) throw new Error("Translation body is empty.");
  if (source.lock) throw new Error("Cannot publish a locked post.");
  if (metadata.source_hash !== sourceHash(source))
    throw new Error(
      "The Korean source changed. Update the translation and source hash before publishing.",
    );
  assertMdxInvariants(source.posting || "", content);
  assertMdxInvariants(source.posting || "", content);
  // Compile only; do not execute translated MDX during validation.
  await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm, remarkMath] },
  });
  const published = matter.stringify(content, {
    ...metadata,
    reviewed_at: new Date().toISOString(),
  });
  const target = path.join(directory, `${id}.mdx`);
  await fs.writeFile(`${target}.tmp`, published);
  await fs.rename(`${target}.tmp`, target);
  console.log(
    `Published file: ${target}. Commit and deploy it to make it available on the live blog.`,
  );
}
