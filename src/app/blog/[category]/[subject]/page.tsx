"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import Image from "next/image";
// import { Pw } from "@/components/Pw";
import dayjs from "dayjs";
import { PostService } from "@/config/apis";

type Props = {
  params: params;
};

interface params {
  category: string;
  subject: string;
}

const Cards = ({ post, idx }: { post: PostResponse.PostView; idx: number }) => {
  const [hover, setHover] = useState(false);

  const dateString = dayjs(post.init_date).format("YYYY-MM-DD");
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="content my-2 flex w-52 flex-col items-center gap-1 rounded-md border border-third text-xs hover:cursor-pointer hover:bg-foreground"
    >
      <div className="absolute">{post.lock && "🔒"}</div>
      <div
        className={`flex max-h-14 min-h-14 w-full justify-center rounded-md ${hover ? "bg-button" : "bg-third"}`}
      >
        <img
          src={
            post.thumbnail_url.startsWith("/")
              ? `https://cdn.promleeblog.com/posts${post.thumbnail_url}`
              : post.thumbnail_url || "/icons/android-chrome-512x512.png"
          }
          alt="thumbnail"
          className="max-h-14 rounded-t-md object-contain"
        />
      </div>
      <div className="flex text-xs">{dateString}</div>
      <div
        className={`text-overflow h-8 w-full items-center pb-2 pl-7 pr-1 indent-[-1.25rem]`}
      >
        {idx + 1}. {hover ? post.name : post.nameko}
      </div>
    </div>
  );
};

const Subject = ({ params }: Props) => {
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
    </Suspense>
  );
};
export default Subject;
