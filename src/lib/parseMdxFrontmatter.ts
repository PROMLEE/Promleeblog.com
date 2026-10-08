export const parseMdxFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatterContent = match[1];
  const frontmatter: Record<string, string> = {};

  for (const line of frontmatterContent.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }

  const body = content.replace(frontmatterRegex, "").trim();

  return { frontmatter, body };
};