import React from "react";
import Link from "next/link";

export const Todown = () => {
  return (
    <Link href="#bottom">
      <svg
        className="sticky bottom-0 ml-auto mt-5 h-8 w-8 rounded-t-md bg-foreground"
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
          d="m19 9-7 7-7-7"
        />
      </svg>
    </Link>
  );
};
