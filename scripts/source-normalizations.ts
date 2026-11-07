import { createHash } from "node:crypto";

// Post124 has an extra opening fence before the pubspec.yaml explanation.
// Repair only that exact source revision for translation validation. The DB
// article and its source_hash remain unchanged; all actual code is preserved.
export function normalizedSourceMarkdown(source: string) {
  const hash = createHash("sha256").update(source).digest("hex");
  if (
    hash === "9c07891a5772b195d51ef3d1e27b402fd164158eed80dcb26699e2ceecdb73e7"
  ) {
    return source.replace(
      "\n```\npubspec.yaml 파일에 패키지가 추가되었는지 확인합니다.\n```yaml",
      "\npubspec.yaml 파일에 패키지가 추가되었는지 확인합니다.\n```yaml",
    );
  }
  // Post117 places Korean punctuation immediately after a bare Windows
  // documentation URL. GFM consumes the punctuation as part of the autolink;
  // make the URL an explicit link for a stable, exact link invariant.
  if (
    hash === "0adb6dbc042bc24aae058af34fc34495049bd2743cf86722fc5b998921ad2061"
  ) {
    return source.replace(
      "(https://go.microsoft.com/fwlink/?LinkID=135170)를",
      "([https://go.microsoft.com/fwlink/?LinkID=135170](https://go.microsoft.com/fwlink/?LinkID=135170))를",
    );
  }
  return source;
}
