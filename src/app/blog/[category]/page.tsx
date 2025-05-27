import Link from "next/link";
import { Metadata } from "next";
import { GenerateMeta } from "@/lib/PostUtils/GenerateMeta_category";
import { PostService } from "@/config/apis";
import AdComponent from "@/components/ads/adsense";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const subjectlist = await PostService().getSubjectList({
    categoryurl: params.category,
  });
  const source: PostResponse.GetSeriesList["data"] = {
    nameko: subjectlist.nameko,
    Series: [],
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
      <AdComponent adSlot="9354906951" adFormat="autorelaxed" />
    </div>
  );
};
export default Category;
