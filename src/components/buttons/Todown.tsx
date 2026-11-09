"use client";

import { messages } from "@/lib/i18n/messages";
import { useLocale } from "@/components/i18n/LocaleProvider";
import React from "react";
import Link from "next/link";

export const Todown = () => {
  const locale = useLocale();
  return (
    <Link href="#bottom" aria-label={messages[locale].goBottom}>
      <svg
        className="sticky bottom-0 z-10 ml-auto mt-5 h-8 w-8 rounded-t-md bg-foreground"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke={"white"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </Link>
  );
};
