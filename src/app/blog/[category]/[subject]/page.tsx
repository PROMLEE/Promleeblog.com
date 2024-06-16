import Link from "next/link";

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
  let serieslist;
  try {
    serieslist = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/serieslist?subjecturl=${params.subject}`,
      { next: { revalidate: 60 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    serieslist = [];
  }
  return (
    <div>
      {/* <Link className={"category"} href={`/blog/${params.category}`}>
        {params.category}
      </Link> */}
      <div
        className={"subject"}
        // href={`/blog/${params.category}/${params.subject}`}
      >
        {params.subject}
      </div>
      {serieslist &&
        serieslist.map((series: any, idx: any) => (
          <div key={idx}>
            <h2 className="mb-3 mt-7 text-3xl font-bold">{series.nameko}</h2>
            <div>
              {series.Post.length
                ? series.Post.map((post: any, idx: number) => (
                    <Link
                      key={idx}
                      href={`/blog/post/${post.id}-${post.url}`}
                      className={"content"}
                    >
                      {post.series_no}. {post.nameko} {post.lock && "🔒"}
                    </Link>
                  ))
                : "no contents 😿"}
            </div>
          </div>
        ))}
    </div>
  );
};
export default Subject;
