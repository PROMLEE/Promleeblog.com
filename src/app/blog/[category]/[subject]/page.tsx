"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import { PostService } from "@/config/apis";
import { Cards } from "@/components/posts/Cards";
import { useParams } from "next/navigation";
import AdComponent from "@/components/ads/adsense";

type Params = { category: string; subject: string };

const Subject = () => {
  const { subject } = useParams<Params>();
  const [serieslist, setSerieslist] = useState<
    PostResponse.GetSeriesList["data"]
  >({ Series: [], nameko: "" });

  useEffect(() => {
    PostService()
      .getSeriesList({ subjecturl: subject })
      .then((data) => {
        setSerieslist(data);
      });
  }, [subject]);
  return (
    <Suspense fallback={<Loading />}>
      <div className={"subject"}>{serieslist.nameko}</div>
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
              <h2 className="mt-7 mb-3 text-2xl font-bold" id={series.nameko}>
                {series.caption && series.caption + " - "}
                {series.nameko}
              </h2>
              <div className="flex w-full flex-wrap gap-3">
                {series.Post.length
                  ? series.Post.map((post, idx) => {
                      return post.lock ? null : (
                        <Link
                          href={`/blog/post/${post.id}-${post.url}`}
                          key={idx}
                        >
                          <Cards post={post} idx={idx} />
                        </Link>
                      );
                    })
                  : "no contents 😿"}
              </div>
            </div>
          );
        })}
      <div className="h-10" />
      <AdComponent adSlot="9354906951" adFormat="autorelaxed" />
    </Suspense>
  );
};
export default Subject;
