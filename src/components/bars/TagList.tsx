"use client";

import { TagsService } from "@/config/apis/service/tags";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TagList = () => {
  const [tagList, setTagList] = useState<TagsResponse.GetTags["data"]>([]);
  const pathname = usePathname();
  // const tagList = await TagsService().getTags({
  //   sort: "count",
  // });

  useEffect(() => {
    TagsService()
      .getTags({
        sort: "count",
      })
      .then((data) => {
        setTagList(data);
      });
  }, []);

  if (pathname.startsWith("/blog/post") || pathname.startsWith("/aboutme")) {
    return null;
  }
  return (
    <div>
      <h2 className="mb-3 mt-7 text-2xl font-bold">
        {/* {series.caption && series.caption + " - "}
        {series.nameko} */}
      </h2>
      <div className="related md:sidebar-md mb-10 border-y-2 px-3 py-3 md:mb-0 md:border-none xl:right-5">
        {tagList.length
          ? tagList.map((tag, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-2 text-text hover:text-blue-500 hover:underline`}
              >
                <Link
                  href={`/tags/${tag.id}-${tag.name}`}
                  className={`mt-3 text-sm font-bold`}
                >
                  # {tag.name}({tag.count})
                </Link>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default TagList;
