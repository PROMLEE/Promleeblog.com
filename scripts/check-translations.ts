import fs from "node:fs/promises";
import { PrismaClient } from "@prisma/client";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { translationLocales } from "../src/lib/i18n/routing";
import { assertMdxInvariants } from "./mdx-invariants";
import { sourceHash } from "../src/lib/i18n/source-hash";

const prisma = new PrismaClient();

try {
  const posts = await prisma.post.findMany({
    where: { OR: [{ lock: false }, { lock: null }] },
    select: { id: true, nameko: true, desc: true, posting: true },
  });
  const published = await prisma.postTranslation.findMany({
    where: { status: "published" },
  });
  const byPostLocale = new Map(
    published.map((translation) => [
      `${translation.post_id}:${translation.locale}`,
      translation,
    ]),
  );
  const missing: Record<string, string[]> = {};
  const invalid: string[] = [];
  let checked = 0;

  for (const locale of translationLocales) {
    missing[locale] = [];
    for (const post of posts) {
      const id = post.id.toString();
      const translation = byPostLocale.get(`${id}:${locale}`);
      if (!translation) {
        missing[locale].push(id);
        continue;
      }
      try {
        if (
          translation.status !== "published" ||
          translation.locale !== locale ||
          !translation.title.trim() ||
          !translation.description.trim() ||
          !translation.reviewed_at ||
          !translation.content.trim()
        )
          throw Error("Incomplete metadata or content");
        if (sourceHash(post) !== translation.source_hash)
          throw Error("Korean source has changed");
        assertMdxInvariants(post.posting || "", translation.content);
        await serialize(translation.content, {
          mdxOptions: { remarkPlugins: [remarkGfm, remarkMath] },
        });
        checked++;
      } catch (error) {
        invalid.push(
          `${locale}/${id}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }

  for (const translation of published) {
    if (!posts.some((post) => post.id === translation.post_id))
      invalid.push(
        `${translation.locale}/${translation.post_id}: published translation refers to a locked or missing post`,
      );
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

  if (invalid.length || (process.argv.includes("--require-complete") && remaining))
    process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
