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
      <div className={"m-5 text-5xl text-white"}>
        {params.category.replace("_", " ")}
      </div>
      {contentList(params).map((content: string, idx: any) => (
        <div key={idx}>
          <Link
            href={`/blog/${params.category}/${params.subject}/${params.title}/${content.replace(".mdx", "")}`}
            className={"m-5 text-2xl hover:text-amber-700"}
          >
            {content.replace("_", " ").replace(".mdx", "")}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Title;
