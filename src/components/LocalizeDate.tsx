"use client";

import dayjs from "dayjs";
import { useLocale } from "@/components/i18n/LocaleProvider";
import "dayjs/locale/ja";
import "dayjs/locale/zh-cn";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";

export function LocalizedDate({ isoString }: { isoString: string }) {
  const locale = useLocale();
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(dayjs(isoString).locale(locale === "zh" ? "zh-cn" : locale).format(locale === "ko" ? "YYYY년 MM월 DD일" : locale === "en" ? "MMMM D, YYYY" : "YYYY年M月D日"));
  }, [isoString, locale]);

  return <span>{formatted}</span>;
}
