"use client";
import { ImageUrl } from "@/lib/PostUtils/getImageUrl";
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
      className="content border-third hover:bg-foreground my-2 flex w-52 flex-col items-center gap-1 rounded-md border text-xs hover:cursor-pointer"
    >
      <div className="absolute">{post.lock && "🔒"}</div>
      <div
        className={`flex max-h-14 min-h-14 w-full justify-center rounded-md ${hover ? "bg-button" : "bg-third"}`}
      >
        <img
          src={ImageUrl(post.thumbnail_url)}
          alt="thumbnail"
          className="max-h-14 rounded-t-md object-contain"
        />
      </div>
      <div className="flex text-xs">{dateString}</div>
      <div
        className={`text-overflow h-8 w-full items-center pr-1 pb-2 pl-7 indent-[-1.25rem]`}
      >
        {idx + 1}. {hover ? post.name : post.nameko}
      </div>
    </div>
  );
};
