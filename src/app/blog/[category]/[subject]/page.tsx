"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import { Pw } from "@/components/Pw";

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
const getSource = async (params: params) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/serieslist?subjecturl=${params.subject}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
};

const Cards = ({ post, idx }: { post: any; idx: number }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className=" content my-2 flex w-52 flex-col items-center gap-3 rounded-md border border-third text-xs hover:cursor-pointer hover:bg-foreground"
    >
      <div className="absolute">{post.lock && "🔒"}</div>
      <div
        className={`flex w-full justify-center rounded-md  ${hover ? "bg-button" : "bg-third"}`}
      >
        <Image
          src={"/icons/android-chrome-512x512.png"}
          alt="thumbnail"
          width={100}
          height={100}
        />
      </div>
      <div className="text-overflow flex h-10 w-full items-center break-normal py-2 pl-7 pr-1 indent-[-1.25rem]">
        {idx + 1}. {hover ? post.name : post.nameko}
      </div>
    </div>
  );
};

const Subject = ({ params }: Props) => {
  const [serieslist, setSerieslist] = useState<any>({ Series: [], nameko: "" });
  const [isopen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const Close = () => {
    setIsOpen(false);
  };
  const Open = () => {
    setIsOpen(true);
  };
  const SetUrl = (url: string) => {
    setUrl(url);
  };

  useEffect(() => {
    const source = getSource(params);
    source.then((data) => {
      setSerieslist(data);
    });
  }, [params]);
  return (
    <Suspense fallback={<Loading />}>
      <Pw isOpen={isopen} Close={Close} url={url} />
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
            <div className="flex w-full flex-wrap gap-3">
              {series.Post.length
                ? series.Post.map((post: any, idx: number) => {
                    return post.lock ? (
                      <div
                        onClick={() => {
                          SetUrl(`/blog/post/${post.id}-${post.url}`);
                          Open();
                        }}
                        key={idx}
                      >
                        <Cards post={post} idx={idx} />
                      </div>
                    ) : (
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
        ))}
    </Suspense>
  );
};
export default Subject;
