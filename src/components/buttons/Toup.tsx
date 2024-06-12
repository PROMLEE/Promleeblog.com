import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export const Toup = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Link href="#">
      <svg
        className="sticky top-0 z-10 mb-2 ml-auto h-8 w-8 rounded-b-md bg-foreground"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke={theme === "dark" ? "#202124" : "white"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m5 15 7-7 7 7"
        />
      </svg>
    </Link>
  );
};
