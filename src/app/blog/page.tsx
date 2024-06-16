import Link from "next/link";
// import { CategoryKo } from "@/config/koname";
// function CategoryList() {
//   const fs = require("fs");
//   const path = `${process.cwd()}/src/posts`;
//   return fs.readdirSync(path);
// }

const Blog = async () => {
  let categorylist;
  try {
    categorylist = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/categorylist`,
      { next: { revalidate: 60 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    categorylist = [];
  }
  return (
    <div>
      <h1 className={"my-20 text-7xl font-bold text-purple-200"}>
        All Categories
      </h1>
      {categorylist &&
        categorylist.map((category: any, idx: number) => (
          <Link
            key={idx}
            href={`/blog/${category.url}`}
            className={"category hover:category text-white"}
          >
            {category.nameko}
          </Link>
        ))}
    </div>
  );
};

export default Blog;
