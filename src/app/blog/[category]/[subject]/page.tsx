"use client";

import Link from "next/link";
import { Suspense, useEffect, useState, use } from "react";
import { Loading } from "@/components/Loading";
// import { Pw } from "@/components/Pw";
import { PostService } from "@/config/apis";
import { Cards } from "@/components/posts/Cards";

type Props = {
  params: params;
};

interface params {
  category: string;
  subject: string;
}

const Subject = (props: Props) => {
  const params = use(props.params);
  const [serieslist, setSerieslist] = useState<
    PostResponse.GetSeriesList["data"]
  >({ Series: [], nameko: "" });
  // const [isopen, setIsOpen] = useState(false);
  // const Close = () => {
  //   setIsOpen(false);
  // };

  useEffect(() => {
    PostService()
      .getSeriesList({ subjecturl: params.subject })
      .then((data) => {
        setSerieslist(data);
      });
  }, [params]);
  return (
    <Suspense fallback={<Loading />}>
      {/* <Pw isOpen={isopen} Close={Close} url={url} /> */}
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
        serieslist.Series.map((series, idx) => {
          for (let i = 0; i < series.Post.length; i++) {
            if (series.Post[i].lock === false) {
              break;
            }
            if (i === series.Post.length - 1) {
              return null;
            }
          }
          return (
            <div key={idx}>
              <h2 className="mb-3 mt-7 text-2xl font-bold" id={series.nameko}>
                {series.caption && series.caption + " - "}
                {series.nameko}
              </h2>
              <div className="flex w-full flex-wrap gap-3">
                {series.Post.length
                  ? series.Post.map((post, idx) => {
                      return post.lock ? null : (
                        // <div
                        //   onClick={() => {
                        //     SetUrl(`/blog/post/${post.id}-${post.url}`);
                        //     Open();
                        //   }}
                        //   key={idx}a
                        // >
                        //   <Cards post={post} idx={idx} />
                        // </div>
                        (<Link
                          href={`/blog/post/${post.id}-${post.url}`}
                          key={idx}
                        >
                          <Cards post={post} idx={idx} />
                        </Link>)
                      );
                    })
                  : "no contents 😿"}
              </div>
            </div>
          );
        })}
    </Suspense>
  );
};
export default Subject;
