import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Prisma, PrismaClient } from "@prisma/client";
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
  !["prepare", "save-draft", "publish"].includes(command)
) {
  throw new Error(
    "Usage: npm run translation -- prepare|save-draft|publish POST_ID en|ja|zh [--reviewed]",
  );
}

const directory = path.join(process.cwd(), "content/translations", locale);
const draftPath = path.join(directory, `${id}.draft.mdx`);
const sourceFile = path.join(directory, `${id}.source.json`);
const api = (
  process.env.TRANSLATION_SOURCE_URL || "https://www.promleeblog.com"
).replace(/\/$/, "");
const prisma = new PrismaClient();

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

function jsonMetadata(value: Record<string, unknown>) {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

async function upsertTranslation(
  status: "draft" | "published",
  metadata: Record<string, unknown>,
  content: string,
  reviewedAt: Date | null,
) {
  const values = {
    title: String(metadata.title),
    description: String(metadata.description),
    content,
    metadata: jsonMetadata(metadata),
    source_hash: String(metadata.source_hash),
    reviewed_at: reviewedAt,
  };
  await prisma.postTranslation.upsert({
    where: {
      post_id_locale_status: {
        post_id: BigInt(id),
        locale,
        status,
      },
    },
    create: {
      post_id: BigInt(id),
      locale,
      status,
      ...values,
    },
    update: values,
  });
}

async function refreshLivePages() {
  const url =
    process.env.REVALIDATION_URL || `${api}/api/revalidate/post`;
  const token = process.env.REVALIDATION_TOKEN;
  if (!url || !token) {
    console.log(
      "No revalidation endpoint is configured; the page cache will refresh within 60 seconds.",
    );
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post_id: id }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok)
      throw new Error(`Revalidation returned ${response.status}`);
    console.log("Live article, home pages, and sitemaps refreshed.");
  } catch (error) {
    console.warn(
      "Translation is published in the database, but immediate cache refresh failed; it will refresh within 60 seconds.",
      error,
    );
  }
}

async function main() {
  const source = await loadSource();
  await fs.mkdir(directory, { recursive: true });

  if (command === "prepare") {
    try {
      await fs.access(draftPath);
      throw new Error(`Draft already exists: ${draftPath}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }

    const storedDraft = await prisma.postTranslation.findUnique({
      where: {
        post_id_locale_status: {
          post_id: BigInt(id),
          locale,
          status: "draft",
        },
      },
    });
    const storedPublished = storedDraft
      ? null
      : await prisma.postTranslation.findUnique({
          where: {
            post_id_locale_status: {
              post_id: BigInt(id),
              locale,
              status: "published",
            },
          },
        });
    const existing = storedDraft || storedPublished;
    const storedMetadata =
      existing?.metadata &&
      typeof existing.metadata === "object" &&
      !Array.isArray(existing.metadata)
        ? (existing.metadata as Record<string, unknown>)
        : {};
    const metadata: Record<string, unknown> = existing
      ? {
          ...storedMetadata,
          post_id: id,
          locale,
          title: existing.title,
          description: existing.description,
          source_hash: existing.source_hash,
        }
      : {
          post_id: id,
          locale,
          title: "",
          description: "",
          source_hash: sourceHash(source),
        };
    delete metadata.reviewed_at;

    await fs.writeFile(draftPath, matter.stringify(existing?.content || "", metadata), {
      flag: "wx",
    });
    await fs.writeFile(sourceFile, JSON.stringify(source, null, 2));
    console.log(
      existing
        ? `Draft exported from the database: ${draftPath}`
        : `Draft created: ${draftPath}`,
    );
    return;
  }

  const isPublish = command === "publish";
  if (isPublish && !process.argv.includes("--reviewed"))
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
      source_hash: z.string().regex(/^[a-f0-9]{64}$/),
    })
    .passthrough()
    .parse(data);
  if (!content.trim()) throw new Error("Translation body is empty.");
  if (isPublish && source.lock) throw new Error("Cannot publish a locked post.");
  if (metadata.source_hash !== sourceHash(source))
    throw new Error(
      "The Korean source changed. Update the translation and source hash before saving.",
    );
  assertMdxInvariants(source.posting || "", content);
  await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm, remarkMath] },
  });

  const cleanMetadata = { ...metadata } as Record<string, unknown>;
  delete cleanMetadata.reviewed_at;
  await upsertTranslation("draft", cleanMetadata, content, null);

  if (!isPublish) {
    console.log(`Draft saved to the database: ${id}/${locale}`);
    return;
  }
  const reviewedAt = new Date();
  const publishedMetadata = {
    ...cleanMetadata,
    reviewed_at: reviewedAt.toISOString(),
  };
  await upsertTranslation("published", publishedMetadata, content, reviewedAt);
  await refreshLivePages();
  console.log(
    `Published to the database: ${id}/${locale}. No Vercel deployment is needed.`,
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
