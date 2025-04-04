export const ImageUrl = (src?: string) => {
  if (!src) return "/icons/android-chrome-512x512.png";
  else if (process.env.NEXT_PUBLIC_NODE_ENV === "development") return src;
  else if (src.startsWith("/posts")) return `https://cdn.promleeblog.com${src}`;
  else if (src.startsWith("/"))
    return `https://cdn.promleeblog.com/posts${src}`;
  else return src;
};
