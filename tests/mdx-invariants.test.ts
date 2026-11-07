import { test } from "node:test";
import assert from "node:assert/strict";
import { assertMdxInvariants } from "../scripts/mdx-invariants";
const source =
  '## 제목\n\n[문서](https://example.com)\n\n<Img src="/image.png" alt="설명" />\n\n$x^2$\n\n```js\nconst value = 1;\n```';
const translation =
  '## Heading\n\n[Docs](https://example.com)\n\n<Img src="/image.png" alt="Description" />\n\n$x^2$\n\n```js\nconst value = 1;\n```';
test("text and image descriptions can be translated", () =>
  assert.doesNotThrow(() => assertMdxInvariants(source, translation)));
test("code, links, formulas, components and heading levels cannot silently change", () => {
  for (const changed of [
    translation.replace("value = 1", "value = 2"),
    translation.replace("https://example.com", "https://other.com"),
    translation.replace("x^2", "x^3"),
    translation.replace("<Img", "<Image"),
    translation.replace("## Heading", "# Heading"),
  ])
    assert.throws(() => assertMdxInvariants(source, changed));
});
test("stored article frontmatter does not count as body headings", () => {
  assert.doesNotThrow(() =>
    assertMdxInvariants(
      "---\ntitle: Original\n---\n## 제목\nBody",
      "## Heading\nTranslated body",
    ),
  );
});
