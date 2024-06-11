import React from "react";
import Link from "next/link";
export const Toup = () => {
  return (
    <Link href="#">
      <svg
        className="sticky top-0 mb-2 ml-auto h-8 w-8 rounded-b-md bg-foreground"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m5 15 7-7 7 7"
        />
      </svg>
    </Link>
  );
};
