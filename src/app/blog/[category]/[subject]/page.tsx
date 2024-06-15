import Link from "next/link";
import { CategoryKo } from "@/config/koname";

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

const Subject = async ({ params }: Props) => {
  const serieslist = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/serieslist?subjecturl=${params.subject}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return (
    <div>
      <Link className={"category"} href={`/blog/${params.category}`}>
        {params.category}
      </Link>
      <Link
        className={"subject"}
        href={`/blog/${params.category}/${params.subject}`}
      >
        {params.subject}
      </Link>
      {serieslist.map((series: any, idx: any) => (
        <>
          {series.nameko}
          <div>
            {series.Post.map((post: any, idx: number) => (
              <Link
                key={idx}
                href={`/blog/${params.category}/${params.subject}/${post.id}`}
                className={"content hover:content text-white hover:underline"}
              >
                {post.series_no}. {post.nameko}
              </Link>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
export default Subject;
