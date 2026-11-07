"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/lib/i18n/routing";
import { useLocale } from "./LocaleProvider";

export default function Link({
  href,
  ...props
}: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return (
    <NextLink
      {...props}
      href={typeof href === "string" ? localizePath(href, locale) : href}
    />
  );
}
