import Link from "next/link";
import { Metadata } from "next";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta_category";
import { Suspense } from "react";

type Props = {
  params: params;
};

interface params {
  category: string;
  subject: string;
}

// function contentList(params: params) {
//   const fs = require("fs");
//   const path = `${process.cwd()}/src/posts/${params.category}/${params.subject}`;
//   return fs.readdirSync(path);
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const source = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/serieslist?subjecturl=${params.subject}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return GenerateMeta({ meta: source, params });
}

const Subject = async ({ params }: Props) => {
  let serieslist;
  try {
    serieslist = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/serieslist?subjecturl=${params.subject}`,
      { next: { revalidate: 60 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    serieslist = { Series: [], nameko: "" };
  }
  return (
    <Suspense fallback={<div>loading...</div>}>
      {/* <Link className={"category"} href={`/blog/${params.category}`}>
        {params.category}
      </Link> */}
      <div
        className={"subject"}
        // href={`/blog/${params.category}/${params.subject}`}
      >
        {serieslist.nameko}
      </div>
      {serieslist.Series &&
        serieslist.Series.map((series: any, idx: any) => (
          <div key={idx}>
            <h2 className="mb-3 mt-7 text-2xl font-bold" id={series.nameko}>
              {series.caption && series.caption + " - "}
              {series.nameko}
            </h2>
            <div>
              {series.Post.length
                ? series.Post.map((post: any, idx: number) => (
                    <Link
                      key={idx}
                      href={`/blog/post/${post.id}-${post.url}`}
                      className={"content"}
                    >
                      {idx + 1}. {post.nameko} {post.lock && "🔒"}
                    </Link>
                  ))
                : "no contents 😿"}
            </div>
          </div>
        ))}
    </Suspense>
  );
};
export default Subject;
