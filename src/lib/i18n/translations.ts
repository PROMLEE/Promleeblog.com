import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
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
const directory = (locale: TranslationLocale) =>
  path.join(process.cwd(), "content/translations", locale);

export async function getTranslation(
  id: string,
  locale: TranslationLocale,
): Promise<Translation | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  let file: string;
  try {
    file = await fs.readFile(path.join(directory(locale), `${id}.mdx`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  const { data, content } = matter(file);
  const metadata = translationSchema.parse(data);
  if (metadata.locale !== locale || metadata.post_id !== id || !content.trim())
    throw new Error(`Invalid published translation: ${id}`);
  return { ...metadata, content };
}

export async function getTranslations(locale: TranslationLocale) {
  const files = await fs
    .readdir(directory(locale))
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
  const translations = await Promise.all(
    files
      .filter((file) => /^[1-9]\d*\.mdx$/.test(file))
      .map((file) => getTranslation(file.replace(/\.mdx$/, ""), locale)),
  );
  return new Map(
    translations
      .filter((item): item is Translation => item !== null)
      .map((item) => [item.post_id, item]),
  );
}
