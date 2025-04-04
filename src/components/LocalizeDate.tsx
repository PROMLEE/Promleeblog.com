"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";

export function LocalizedDate({ isoString }: { isoString: string }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    dayjs.locale("ko");
    setFormatted(dayjs(isoString).format("YYYY년 MM월 DD일"));
  }, [isoString]);

  return <span>{formatted}</span>;
}
