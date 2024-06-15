import Link from "next/link";
// import { CategoryKo } from "@/config/koname";
// function CategoryList() {
//   const fs = require("fs");
//   const path = `${process.cwd()}/src/posts`;
//   return fs.readdirSync(path);
// }

const Blog = async () => {
  const categorylist = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/categorylist`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return (
    <div>
      <h1 className={"my-5 text-5xl font-bold text-purple-200"}>
        All Categories
      </h1>
      {categorylist &&
        categorylist.map((category: any, idx: number) => (
          <Link
            key={idx}
            href={`/blog/${category.url}`}
            className={"category text-white hover:underline"}
          >
            {category.nameko}
          </Link>
        ))}
    </div>
  );
};

export default Blog;
