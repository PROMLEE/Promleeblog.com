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
      <div className={"m-5 text-5xl text-white"}>
        {params.category.replace("_", " ")}
      </div>
      {SubjectList(params.category).map((subject: string, idx: any) => (
        <div key={idx}>
          <Link
            href={`/blog/${params.category}/${subject}`}
            className={"m-5 text-2xl hover:text-amber-700"}
          >
            {subject}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Category;
