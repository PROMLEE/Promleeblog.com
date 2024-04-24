import Link from "next/link";

function CategoryList() {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts`;
  return fs.readdirSync(path);
}

const Blog = () => {
  return (
    <div>
      <h1 className={"text-5xl my-5"}>All Categories</h1>
      {CategoryList().map((category: string, idx: number) => (
        <div key={idx}>
          <Link
            href={`/blog/${category}`}
            className={"category text-white hover:category hover:underline"}
          >
            {category.replaceAll("_", " ")}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Blog;
