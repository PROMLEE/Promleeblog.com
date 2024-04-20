import Link from "next/link";

type Props = {
  params: {
    category: string;
  };
};
function TitleList(category: string) {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts/${category}`;
  return fs.readdirSync(path);
}

const Category = async ({ params }: Props) => {
  // const post = await getPostDetail(params.category, params.id);
  return (
    <div>
      <div className={"text-5xl"}>{params.category}</div>
      {TitleList(params.category).map((title: string, idx: any) => (
        <div key={idx}>
          <Link href={`/blog/${params.category}/${title}`}>{title}</Link>
        </div>
      ))}
    </div>
  );
};
export default Category;
