"use client"; // Error components must be Client Components

import Link from "next/link";
import { usePathname } from "next/navigation";
import { messages } from "@/lib/i18n/messages";
import { isLocale, localizePath } from "@/lib/i18n/routing";
import { useEffect } from "react";

export default function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const prefix = usePathname().split("/")[1];
  const locale = isLocale(prefix) ? prefix : "ko";
  const t = messages[locale];

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="my-20 text-3xl font-bold">⚠️ {t.error}</h2>
      <Link href={localizePath("/", locale)}>{t.goHome}</Link>
    </div>
  );
}
