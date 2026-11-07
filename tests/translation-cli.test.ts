import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import matter from "gray-matter";
const run = promisify(execFile);

test("publication validates source freshness and never overwrites a live translation on failure", async () => {
  const root = process.cwd();
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "promlee-publish-"),
  );
  const source = {
    nameko: "원문",
    desc: "설명",
    posting: "## 제목\n본문\n<Ads1 />",
    lock: false,
  };
  const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ data: source }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const invoke = (...args: string[]) =>
    run(
      process.execPath,
      [
        "--import",
        path.join(root, "node_modules/tsx/dist/loader.mjs"),
        path.join(root, "scripts/translation.ts"),
        ...args,
      ],
      {
        cwd: directory,
        env: {
          ...process.env,
          TRANSLATION_SOURCE_URL: `http://127.0.0.1:${address.port}`,
        },
        timeout: 15000,
      },
    );
  try {
    await invoke("prepare", "109", "ja");
    const draftPath = path.join(
      directory,
      "content/translations/ja/109.draft.mdx",
    );
    const target = path.join(directory, "content/translations/ja/109.mdx");
    const { data } = matter(await fs.readFile(draftPath, "utf8"));
    await assert.rejects(invoke("prepare", "109", "ja"));
    await assert.rejects(invoke("publish", "109", "ja"));
    await assert.rejects(invoke("publish", "109", "ja", "--reviewed"));
    await fs.writeFile(
      draftPath,
      matter.stringify("## 見出し\n本文\n<Ads1 />", {
        ...data,
        title: "記事",
        description: "説明",
      }),
    );
    await invoke("publish", "109", "ja", "--reviewed");
    const published = await fs.readFile(target, "utf8");
    assert.match(published, /reviewed_at:/);
    assert.match(published, /<Ads1 \/>/);
    source.posting += "\n変更";
    await assert.rejects(invoke("publish", "109", "ja", "--reviewed"));
    assert.equal(await fs.readFile(target, "utf8"), published);
    source.posting = "## 제목\n본문\n<Ads1 />";
    source.lock = true;
    await assert.rejects(invoke("publish", "109", "ja", "--reviewed"));
    assert.equal(await fs.readFile(target, "utf8"), published);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await fs.rm(directory, { recursive: true, force: true });
  }
});
