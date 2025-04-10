"use client";

import { useState, useEffect } from "react";
import { MainService } from "@/config/apis";
import { usePathname } from "next/navigation";
import { PostLink } from "./PostLink";

const LeftSidebarComp = () => {
  const pathname = usePathname();
  const [recommend, setRecommend] = useState<MainResponse.GetRecommend["data"]>(
    [],
  );
  const [series, setSeries] =
    useState<MainResponse.GetSeriesFromPostId["data"]>();

  useEffect(() => {
    MainService()
      .getRecommend({ take: 10 })
      .then((data) => {
        setRecommend(data);
      });
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/blog/post")) {
      MainService()
        .getSeriesFromPostId({
          postid: pathname.split("/")[3].split("-")[0],
        })
        .then((data) => {
          setSeries(data);
        });
    }
  }, [pathname]);

  return (
    <div className="related leftsidebar block md:hidden xl:block">
      {series &&
        series.Post.length > 0 &&
        pathname.startsWith("/blog/post") && (
          <div className="mt-4 w-full px-2">
            <h2 className="mb-3 text-sm">{series.nameko}</h2>
            <div className="flex w-full flex-col">
              {series.Post.map((post, index) => (
                <PostLink
                  key={index}
                  id={post.id}
                  url={post.url}
                  nameko={post.nameko}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      <div className="mt-4 w-full px-2">
        <h2 className="mb-3 text-sm">추천 포스트</h2>
        <div className="flex w-full flex-col">
          {recommend.map((post, index) => (
            <PostLink
              key={index}
              id={post.id}
              url={post.url}
              nameko={post.nameko}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarComp;
