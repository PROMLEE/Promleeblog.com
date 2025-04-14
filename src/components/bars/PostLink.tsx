"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PostLinkProps {
  id: string;
  url: string;
  nameko: string;
  index: number;
}

export const PostLink = ({ id, url, nameko, index }: PostLinkProps) => {
  const pathname = usePathname();
  const currentPath = `/blog/post/${id}-${url}`;
  const isActive = pathname === currentPath;

  return (
    <Link
      href={currentPath}
      className={`group relative my-0.5 w-full rounded-lg p-1.5 transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-amber-50 dark:bg-amber-950/30"
          : "hover:bg-blue-50 dark:hover:bg-blue-800/50"
      } hover:scale-[1.02] hover:shadow-sm`}
    >
      <div className="flex items-start justify-center gap-2 select-none">
        <span
          className={`flex items-center justify-center text-xs transition-colors duration-300 ${
            isActive
              ? "text-amber-600 dark:text-amber-300"
              : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
          }`}
        >
          {index + 1}
        </span>
        <p
          className={`line-clamp-2 min-w-0 flex-1 text-xs transition-colors duration-300 ${
            isActive
              ? "text-amber-600 dark:text-amber-300"
              : "text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200"
          }`}
        >
          {nameko}
        </p>
      </div>
    </Link>
  );
};
