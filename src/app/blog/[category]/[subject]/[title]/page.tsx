import Link from "next/link";
import { CategoryKo } from "@/config/koname";
interface params {
  category: string;
  subject: string;
  title: string;
}

type Props = {
  params: params;
};

function contentList(params: params) {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts/${params.category}/${params.subject}/${params.title}`;
  return fs.readdirSync(path);
}

const Title = ({ params }: Props) => {
  let seriese = "";
  return (
    <div>
      <Link className={"category"} href={`/blog/${params.category}`}>
        {CategoryKo[params.category].name}
      </Link>
      <Link
        className={"subject"}
        href={`/blog/${params.category}/${params.subject}`}
      >
        {CategoryKo[params.category].sub[params.subject].name}
      </Link>
      <Link
        className={"title"}
        href={`/blog/${params.category}/${params.subject}/${params.category}`}
      >
        {
          CategoryKo[params.category].sub[params.subject].title[params.title]
            .name
        }
      </Link>
      {contentList(params).map((content: string, idx: any) => {
        if (seriese !== content.slice(0, 2)) {
          seriese = content.slice(0, 2);
          return (
            <Link
              key={idx}
              href={`/blog/${params.category}/${params.subject}/${params.title}/${content.replaceAll(".mdx", "")}`}
              className={"content mt-4 hover:text-pink-500 hover:underline"}
            >
              {content.replaceAll("mdx", "")}{" "}
              {
                CategoryKo[params.category].sub[params.subject].title[
                  params.title
                ].content[content.replaceAll(".mdx", "")].name
              }
            </Link>
          );
        } else {
          return (
            <Link
              key={idx}
              href={`/blog/${params.category}/${params.subject}/${params.title}/${content.replaceAll(".mdx", "")}`}
              className={"content mt-1 hover:text-pink-500 hover:underline"}
            >
              {content.replaceAll("mdx", "")}{" "}
              {
                CategoryKo[params.category].sub[params.subject].title[
                  params.title
                ].content[content.replaceAll(".mdx", "")].name
              }
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Title;
