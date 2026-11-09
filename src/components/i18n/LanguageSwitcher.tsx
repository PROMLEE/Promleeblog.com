"use client";
import { usePathname } from "next/navigation";
import { locales, localeCookie, localizePath, isLocale } from "@/lib/i18n/routing";
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
        const selected = event.target.value;
        if (!isLocale(selected)) return;
        const secure = window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `${localeCookie}=${selected}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
        const { search, hash } = window.location;
        window.location.assign(localizePath(pathname, selected) + search + hash);
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
