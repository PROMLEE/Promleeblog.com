export const ImageUrl = (src?: string) => {
  if (!src) return "/icons/android-chrome-512x512.png";
  else if (src.startsWith("http")) return src;
  else if (src.startsWith("/posts"))
    return `https://cdn.promleeblog.com${src.split(".")[0] + ".webp"}`; // for posts in the root directory
  else return `https://cdn.promleeblog.com/posts${src.split(".")[0] + ".webp"}`;
};

export const DevImageUrl = async (src?: string) => {
  if (!src) return "/icons/android-chrome-512x512.png";
  else if (src.startsWith("http")) return src;
  else if (src.startsWith("/")) {
    const localPath = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts${src}`;
    try {
      await fetch(localPath);
      return localPath;
    } catch {
      if (src.startsWith("/posts"))
        return `https://cdn.promleeblog.com/posts${src.split(".")[0] + ".webp"}`;
      else return `https://cdn.promleeblog.com${src.split(".")[0] + ".webp"}`;
    }
  }
  return src;
};
