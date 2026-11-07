"use client";
import { usePathname } from "next/navigation";
import { locales, localizePath } from "@/lib/i18n/routing";
import { languageNames, messages } from "@/lib/i18n/messages";
import { useLocale } from "./LocaleProvider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <select
      value={locale}
      aria-label={messages[locale].languages}
      onChange={(event) => {
        window.location.assign(
          localizePath(pathname, event.target.value as typeof locale),
        );
      }}
      className="bg-background max-w-24 rounded-md border px-1 py-1 text-xs"
    >
      {locales.map((value) => (
        <option key={value} value={value}>
          {languageNames[value]}
        </option>
      ))}
    </select>
  );
}
