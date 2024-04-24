import Link from "next/link";

type Props = {
  params: params;
};

interface params {
  category: string;
  subject: string;
}

function contentList(params: params) {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts/${params.category}/${params.subject}`;
  return fs.readdirSync(path);
}
//TODO #2
const Subject = async ({ params }: Props) => {
  return (
    <div>
      <div className={"category"}>{params.category.replaceAll("_", " ")}</div>
      <div className={"subject"}>{params.subject.replaceAll("_", " ")}</div>
      {contentList(params).map((title: string, idx: any) => (
        <div key={idx}>
          <Link
            href={`/blog/${params.category}/${params.subject}/${title}`}
            className={"title text-white hover:title hover:underline"}
          >
            {title.replaceAll("_", " ").replaceAll(".mdx", "")}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Subject;
