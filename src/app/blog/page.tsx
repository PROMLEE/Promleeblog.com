import Link from "next/link";
import { CategoryKo } from "@/config/koname";

function CategoryList() {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts`;
  console.log(fs.readdirSync(path));
  return fs.readdirSync(path);
}

const Blog = () => {
  return (
    <div>
      <h1 className={"my-5 text-5xl font-bold text-purple-200"}>
        All Categories
      </h1>
      {CategoryList().map((category: string, idx: number) => (
        <Link
          key={idx}
          href={`/blog/${category}`}
          className={"category text-white hover:underline"}
        >
          {!category || category === "Test" ? null : CategoryKo[category].name}
        </Link>
      ))}
    </div>
  );
};

export default Blog;
