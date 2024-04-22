import { h1tag, h2tag, h3tag, h4tag, h5tag } from "@/components/mdx/htags";
import { oltag } from "@/components/mdx/litags";
import { btag } from "@/components/mdx/font";

export const components = {
  h1: h1tag,
  h2: h2tag,
  h3: h3tag,
  h4: h4tag,
  h5: h5tag,
  ol: oltag,
  strong: btag,
  b: btag,
};
