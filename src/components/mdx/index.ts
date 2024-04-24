import {
  h1tag,
  h2tag,
  h3tag,
  h4tag,
  h5tag,
  oltag,
  litag,
  btag,
  ptag,
  spantag,
  atag,
  imgtag,
} from "@/components/mdx/defaulttags";
import { Answer, Math } from "@/components/mdx/customtags";

export const components = {
  h1: h1tag,
  h2: h2tag,
  h3: h3tag,
  h4: h4tag,
  h5: h5tag,
  // ol: oltag,
  // li: litag,
  strong: btag,
  b: btag,
  // p: ptag,
  // span: spantag,
  // a: atag,
  // img: imgtag,
  Answer,
  Math,
};
