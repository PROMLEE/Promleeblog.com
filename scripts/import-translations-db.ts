import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Prisma, PrismaClient } from "@prisma/client";
import { translationLocales } from "../src/lib/i18n/routing";

const prisma = new PrismaClient();
const directory = path.join(process.cwd(), "content/translations");
const posts = await prisma.post.findMany({ select: { id: true } });
const postIds = new Set(posts.map((post) => post.id.toString()));
const rows: Prisma.PostTranslationCreateManyInput[] = [];

try {
  for (const locale of translationLocales) {
    const localeDirectory = path.join(directory, locale);
    const files = await fs.readdir(localeDirectory);

    for (const file of files) {
      const match = file.match(/^([1-9]\d*)(\.draft)?\.mdx$/);
      if (!match) continue;

      const [, postId, draftSuffix] = match;
      if (!postIds.has(postId))
        throw new Error(`${locale}/${file} references missing Post ${postId}`);

      const status = draftSuffix ? "draft" : "published";
      const { data, content } = matter(
        await fs.readFile(path.join(localeDirectory, file), "utf8"),
      );
      const title = String(data.title ?? "").trim();
      const description = String(data.description ?? "").trim();
      const sourceHash = String(data.source_hash ?? "");
      const reviewedAt = data.reviewed_at
        ? new Date(String(data.reviewed_at))
        : null;

      if (String(data.post_id) !== postId || data.locale !== locale)
        throw new Error(`${locale}/${file} has mismatched post_id or locale`);
      if (!title || !description || !content.trim())
        throw new Error(`${locale}/${file} has incomplete translation data`);
      if (!/^[a-f0-9]{64}$/.test(sourceHash))
        throw new Error(`${locale}/${file} has an invalid source_hash`);
      if (status === "published" && (!reviewedAt || isNaN(reviewedAt.valueOf())))
        throw new Error(`${locale}/${file} is missing a valid reviewed_at`);

      rows.push({
        post_id: BigInt(postId),
        locale,
        status,
        title,
        description,
        content,
        metadata: JSON.parse(JSON.stringify(data)) as Prisma.InputJsonValue,
        source_hash: sourceHash,
        reviewed_at: status === "published" ? reviewedAt : null,
      });
    }
  }

  const existing = await prisma.postTranslation.count();
  if (existing)
    throw new Error(
      `PostTranslation already has ${existing} rows; refusing to overwrite production data.`,
    );

  let inserted = 0;
  for (let index = 0; index < rows.length; index += 250) {
    const result = await prisma.postTranslation.createMany({
      data: rows.slice(index, index + 250),
      skipDuplicates: true,
    });
    inserted += result.count;
  }

  console.log(
    JSON.stringify(
      {
        imported: inserted,
        prepared: rows.length,
        locales: Object.fromEntries(
          translationLocales.map((locale) => [
            locale,
            {
              published: rows.filter(
                (row) => row.locale === locale && row.status === "published",
              ).length,
              drafts: rows.filter(
                (row) => row.locale === locale && row.status === "draft",
              ).length,
            },
          ]),
        ),
      },
      null,
      2,
    ),
  );
} finally {
  await prisma.$disconnect();
}
