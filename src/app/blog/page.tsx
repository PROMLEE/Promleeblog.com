import Link from "next/link";

function CategoryList() {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts`;
  return fs.readdirSync(path);
}

const Blog = () => {
  return (
    <div>
      <h1 className={"text-4xl m-5"}>All Categories</h1>
      {CategoryList().map((category: string, idx: number) => (
        <div key={idx}>
          <Link
            href={`/blog/${category}`}
            className={"m-5 text-2xl hover:text-amber-700"}
          >
            {category.replace("_", " ")}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Blog;
