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
      className={`group relative my-0.5 w-full rounded-lg p-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
    >
      <div className="flex items-start justify-center gap-2">
        <span
          className={`flex items-center justify-center text-xs transition-colors ${
            isActive
              ? "text-amber-600 dark:text-amber-200"
              : "text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white"
          }`}
        >
          {index + 1}
        </span>
        <p
          className={`line-clamp-2 min-w-0 flex-1 text-xs transition-colors ${
            isActive
              ? "font-medium text-amber-600 dark:text-amber-200"
              : "text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
          }`}
        >
          {nameko}
        </p>
      </div>
    </Link>
  );
};
