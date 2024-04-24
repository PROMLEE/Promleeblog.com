import Link from "next/link";

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
      <div className={"category"}>{params.category.replaceAll("_", " ")}</div>
      {SubjectList(params.category).map((subject: string, idx: any) => (
        <div key={idx}>
          <Link
            href={`/blog/${params.category}/${subject}`}
            className={"subject text-white hover:subject hover:underline"}
          >
            {subject.replaceAll("_", " ")}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Category;
