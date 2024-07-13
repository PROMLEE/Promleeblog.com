import Link from "next/link";
import { Metadata } from "next";
import { GenerateMeta } from "@/lib/PostUtils/GenerateMeta_category";
import { MdxMeta } from "@/config/types/types";

export async function generateMetadata(): Promise<Metadata> {
  const source: MdxMeta = {
    name: "Category list",
    nameko: "카테고리 리스트",
    desc: "카테고리 리스트",
    url: "",
    thumbnail_url: "",
    mod_date: "",
    init_date: "",
  };
  return GenerateMeta({ meta: source, params: { category: "" } });
}

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
