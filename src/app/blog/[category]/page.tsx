import Link from "next/link";
import { Metadata } from "next";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta_category";
import { MdxMeta } from "@/config/types/types";

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const source: MdxMeta = {
    name: "Category",
    nameko: "카테고리",
    desc: "카테고리별 포스트 모음",
    url: "",
    thumbnail_url: "",
    mod_date: "",
    init_date: "",
  };
  return GenerateMeta({ meta: source, params });
}

const Category = async ({ params }: Props) => {
  let subjectlist;
  try {
    subjectlist = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/subjectlist?categoryurl=${params.category}`,
      { next: { revalidate: 60 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    subjectlist = { Subject: [], nameko: "" };
  }
  return (
    <div>
      <div className={"category"}>{subjectlist.nameko}</div>
      {subjectlist.Subject &&
        subjectlist.Subject.map((subject: any, idx: number) => (
          <Link
            key={idx}
            href={`/blog/${params.category}/${subject.url}`}
            className={"subject hover:subject text-white"}
          >
            {subject.nameko}
          </Link>
        ))}
    </div>
  );
};
export default Category;
