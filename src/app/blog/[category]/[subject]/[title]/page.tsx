import Link from "next/link";

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

const Title = async ({ params }: Props) => {
  return (
    <div>
      <div className={"category"}>{params.category.replaceAll("_", " ")}</div>
      <div className={"subject"}>{params.subject.replaceAll("_", " ")}</div>
      <h3 className={"title"}>{params.title.replaceAll("_", " ")}</h3>
      {contentList(params).map((content: string, idx: any) => (
        <div key={idx}>
          <Link
            href={`/blog/${params.category}/${params.subject}/${params.title}/${content.replaceAll(".mdx", "")}`}
            className={"content hover:text-pink-500 hover:underline"}
          >
            {content.replaceAll("_", " ").replaceAll(".mdx", "")}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Title;
