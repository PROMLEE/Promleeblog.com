"use client";
import { usePathname } from "next/navigation";
import {
  locales,
  localeCookie,
  localizePath,
  isLocale,
  stripLocale,
} from "@/lib/i18n/routing";
import { languageNames, messages } from "@/lib/i18n/messages";
import { TagsService } from "@/config/apis/service/tags";
import { tagPath, taxonomyName } from "@/lib/i18n/taxonomy";
import { useLocale } from "./LocaleProvider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <select
      value={locale}
      aria-label={messages[locale].languages}
      onChange={async (event) => {
        const selected = event.target.value;
        if (!isLocale(selected)) return;
        const secure = window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `${localeCookie}=${selected}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
        const { search, hash } = window.location;
        let destination = pathname;
        const tagId = stripLocale(pathname).match(/^\/tags\/([1-9]\d*)-/)?.[1];
        if (tagId) {
          try {
            const tags = await TagsService().getTags({ sort: "id" });
            const tag = tags.find((item) => String(item.id) === tagId);
            if (tag) destination = tagPath(tag.id, taxonomyName(tag, selected));
          } catch {
            // The destination also resolves tags by ID.
          }
        }
        window.location.assign(
          localizePath(destination, selected) + search + hash,
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
