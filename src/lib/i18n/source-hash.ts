import { createHash } from "node:crypto";

export function sourceHash(post: {
  nameko: string;
  desc: string | null;
  posting: string | null;
}) {
  return createHash("sha256")
    .update(JSON.stringify([post.nameko, post.desc ?? "", post.posting ?? ""]))
    .digest("hex");
}
