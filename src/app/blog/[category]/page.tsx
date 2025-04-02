import Link from "next/link";
import { Metadata } from "next";
import { GenerateMeta } from "@/lib/PostUtils/GenerateMeta_category";
import { MdxMeta } from "@/config/types/types";
import { PostService } from "@/config/apis";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const subjectlist = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/subjectlist?categoryurl=${params.category}`,
    { next: { revalidate: 3600 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  const source: MdxMeta = {
    name: subjectlist.name,
    nameko: subjectlist.nameko,
    desc: subjectlist.desc,
    url: "",
    thumbnail_url: "",
    mod_date: "",
    init_date: "",
  };
  return GenerateMeta({ meta: source, params });
}

const Category = async (props: Props) => {
  const params = await props.params;
  const subjectlist = await PostService().getSubjectList({
    categoryurl: params.category,
  });
  return (
    <div>
      <div className={"category"}>{subjectlist.nameko}</div>
      {subjectlist.Subject &&
        subjectlist.Subject.map(
          (
            subject: PostResponse.GetSubjectList["data"]["Subject"][0],
            idx: number,
          ) => (
            <Link
              key={idx}
              href={`/blog/${params.category}/${subject.url}`}
              className={"subject hover:subject text-white"}
            >
              {subject.nameko}
            </Link>
          ),
        )}
    </div>
  );
};
export default Category;
