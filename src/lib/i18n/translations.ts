import "server-only";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { TranslationLocale } from "./routing";

export const translationSchema = z.object({
  post_id: z.string().regex(/^[1-9]\d*$/),
  locale: z.enum(["en", "ja", "zh"]),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  source_hash: z.string().regex(/^[a-f0-9]{64}$/),
  reviewed_at: z.string().datetime(),
});

export type Translation = z.infer<typeof translationSchema> & {
  content: string;
};

function toTranslation(row: {
  post_id: bigint;
  locale: string;
  status: string;
  title: string;
  description: string;
  content: string;
  source_hash: string;
  reviewed_at: Date | null;
}): Translation {
  if (row.status !== "published" || !row.reviewed_at)
    throw new Error(`Translation ${row.post_id}/${row.locale} is not published`);

  return {
    ...translationSchema.parse({
      post_id: row.post_id.toString(),
      locale: row.locale,
      title: row.title,
      description: row.description,
      source_hash: row.source_hash,
      reviewed_at: row.reviewed_at.toISOString(),
    }),
    content: row.content,
  };
}

export async function getTranslation(
  id: string,
  locale: TranslationLocale,
): Promise<Translation | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;

  const row = await prisma.postTranslation.findUnique({
    where: {
      post_id_locale_status: {
        post_id: BigInt(id),
        locale,
        status: "published",
      },
    },
  });

  return row ? toTranslation(row) : null;
}

export async function getTranslations(locale: TranslationLocale) {
  const rows = await prisma.postTranslation.findMany({
    where: { locale, status: "published" },
    orderBy: { post_id: "asc" },
  });

  return new Map(rows.map((row) => [row.post_id.toString(), toTranslation(row)]));
}
