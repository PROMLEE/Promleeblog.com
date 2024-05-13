import Link from "next/link";
import { CategoryKo } from "@/config/koname";
type Props = {
  params: {
    category: string;
  };
};

function SubjectList(category: string) {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts/${category}`;
  return fs.readdirSync(path);
}

const Category = async ({ params }: Props) => {
  return (
    <div>
      <Link className={"category"} href={`/blog/${params.category}`}>
        {CategoryKo[params.category].name}
      </Link>{" "}
      {SubjectList(params.category).map((subject: string, idx: number) => (
        <Link
          key={idx}
          href={`/blog/${params.category}/${subject}`}
          className={"subject text-white hover:subject hover:underline"}
        >
          {CategoryKo[params.category].sub[subject].name}
        </Link>
      ))}
    </div>
  );
};
export default Category;
