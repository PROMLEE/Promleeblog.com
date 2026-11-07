import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import matter from "gray-matter";
import { localizePath, stripLocale } from "../src/lib/i18n/routing";
import { sourceHash } from "../src/lib/i18n/source-hash";
import { getTranslation, getTranslations } from "../src/lib/i18n/translations";

test("switching preserves article paths and excludes APIs and editors", () => {
  assert.equal(
    localizePath("/blog/post/109-example", "ja"),
    "/ja/blog/post/109-example",
  );
  assert.equal(
    localizePath("/zh/blog/post/109-example", "en"),
    "/en/blog/post/109-example",
  );
  assert.equal(localizePath("/en", "ko"), "/");
  assert.equal(stripLocale("/english"), "/english");
  for (const url of [
    "https://example.com",
    "//example.com",
    "/api/post",
    "/blog/edit",
    "/download/report.pdf",
    "/posts/figure.webp",
    "#heading",
  ])
    assert.equal(localizePath(url, "zh"), url);
});
test("source title and body changes are detected", () => {
  const source = { nameko: "Title", desc: "Description", posting: "Content" };
  assert.notEqual(
    sourceHash(source),
    sourceHash({ ...source, posting: "New content" }),
  );
  assert.notEqual(
    sourceHash(source),
    sourceHash({ ...source, nameko: "New title" }),
  );
  assert.equal(sourceHash(source), sourceHash({ ...source }));
});
test("drafts remain private and cannot replace a published snapshot", async () => {
  const originalCwd = process.cwd();
  const temporary = await fs.mkdtemp(
    path.join(os.tmpdir(), "promlee-translations-"),
  );
  try {
    process.chdir(temporary);
    const directory = "content/translations/ja";
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(`${directory}/109.draft.mdx`, "SECRET DRAFT");
    await fs.writeFile(`${directory}/109.source.json`, "SECRET SOURCE");
    assert.equal(await getTranslation("109", "ja"), null);
    assert.equal((await getTranslations("ja")).size, 0);
    const metadata = {
      post_id: "109",
      locale: "ja",
      title: "記事",
      description: "説明",
      source_hash: "a".repeat(64),
      reviewed_at: "2026-11-06T00:00:00.000Z",
    };
    await fs.writeFile(
      `${directory}/109.mdx`,
      matter.stringify("Published body", metadata),
    );
    assert.equal(
      (await getTranslation("109", "ja"))?.content.trim(),
      "Published body",
    );
    assert.equal((await getTranslations("ja")).size, 1);
    assert.equal(await getTranslation("../109", "ja"), null);
    assert.equal(await getTranslation("109", "en"), null);
    await fs.writeFile(
      `${directory}/109.mdx`,
      matter.stringify("wrong language", { ...metadata, locale: "en" }),
    );
    await assert.rejects(getTranslation("109", "ja"));
  } finally {
    process.chdir(originalCwd);
    await fs.rm(temporary, { recursive: true, force: true });
  }
});
