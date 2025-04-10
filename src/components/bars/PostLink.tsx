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
      className={`group relative w-full rounded-lg py-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
    >
      <div className="flex items-start justify-center gap-1">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-sm font-semibold transition-colors ${
            isActive
              ? "text-amber-600 dark:text-amber-400"
              : "text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white"
          }`}
        >
          {index + 1}
        </span>
        <p
          className={`line-clamp-2 min-w-0 flex-1 text-xs transition-colors ${
            isActive
              ? "font-medium text-amber-600 dark:text-amber-400"
              : "text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
          }`}
        >
          {nameko}
        </p>
      </div>
    </Link>
  );
};
