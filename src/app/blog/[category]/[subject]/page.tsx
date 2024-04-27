import Link from "next/link";
import { CategoryKo } from "@/config/koname";

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
      <Link className={"category"} href={`/blog/${params.category}`}>
        {CategoryKo[params.category].name}
      </Link>
      <Link
        className={"subject"}
        href={`/blog/${params.category}/${params.subject}`}
      >
        {CategoryKo[params.category].sub[params.subject].name}
      </Link>{" "}
      {contentList(params).map((title: string, idx: any) => (
        <Link
          key={idx}
          href={`/blog/${params.category}/${params.subject}/${title}`}
          className={"title text-white hover:title hover:underline"}
        >
          {CategoryKo[params.category].sub[params.subject].title[title].name}
        </Link>
      ))}
    </div>
  );
};
export default Subject;
