import Link from "next/link";
import { GenerateMeta } from "@/lib/PostUtils/GenerateMeta_category";
import { PostService } from "@/config/apis";

export async function generateMetadata() {
  const source: PostResponse.GetSeriesList["data"] = {
    nameko: "All Categories",
    Series: [],
  };
  return GenerateMeta({ meta: source, params: { category: "" } });
}

const Blog = async () => {
  const categorylist = await PostService().getCategoryList();
  return (
    <div>
      <h1 className={"my-20 text-7xl font-bold text-purple-200"}>
        All Categories
      </h1>
      {categorylist &&
        categorylist.length > 0 &&
        categorylist.map(
          (category: PostResponse.GetCategoryList["data"][0], idx: number) => (
            <Link
              key={idx}
              href={`/blog/${category.url}`}
              className={"category hover:category text-white"}
            >
              {category.nameko}
            </Link>
          ),
        )}
    </div>
  );
};

export default Blog;
