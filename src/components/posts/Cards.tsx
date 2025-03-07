"use client";
import dayjs from "dayjs";
import { useState } from "react";

export const Cards = ({
  post,
  idx,
}: {
  post: PostResponse.PostView;
  idx: number;
}) => {
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
