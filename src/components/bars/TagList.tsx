"use client";

import { TagsService } from "@/config/apis/service/tags";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TagList = () => {
  const [tagList, setTagList] = useState<TagsResponse.GetTags["data"]>([]);
  const pathname = usePathname();

  useEffect(() => {
    TagsService()
      .getTags({ sort: "count" })
      .then((data) => {
        setTagList(data);
      });
  }, []);

  // 특정 페이지에서는 숨김 처리
  if (
    pathname.startsWith("/blog/post") ||
    pathname.startsWith("/test") ||
    pathname.startsWith("/aboutme")
  ) {
    return null;
  }

  return (
    <div className="mx-4 my-8">
      <div
        className={`md:sidebar-md flex flex-wrap gap-2 border-y border-gray-200 px-2 py-3 transition-opacity duration-1500 ease-in-out md:border-none dark:border-gray-600 ${
          tagList.length > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {tagList.map((tag, idx) => (
          <Link
            key={idx}
            href={`/tags/${tag.id}-${tag.name}`}
            className="group inline-flex max-w-[200px] items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-gray-700 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-100/80 hover:text-gray-900 hover:shadow-sm md:text-sm dark:border-slate-700/50 dark:bg-slate-800/30 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
          >
            <span className="text-gray-500 transition-colors group-hover:text-gray-700 dark:text-slate-400 dark:group-hover:text-slate-300">
              #
            </span>
            <span className="overflow-hidden text-ellipsis">{tag.name}</span>
            <span className="shrink-0 text-[10px] text-gray-400 transition-colors group-hover:text-gray-600 md:text-xs dark:text-slate-500 dark:group-hover:text-slate-400">
              {tag.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagList;
