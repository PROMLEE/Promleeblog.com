export const locales = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export type TranslationLocale = Exclude<Locale, "ko">;
export const localeCookie = "promlee_locale";
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
export const translationLocales: TranslationLocale[] = ["en", "ja", "zh"];
export const siteUrl = "https://www.promleeblog.com";
export function isTranslationLocale(value: string): value is TranslationLocale {
  return translationLocales.includes(value as TranslationLocale);
}
export function stripLocale(path: string) {
  return path.replace(/^\/(en|ja|zh)(?=\/|$)/, "") || "/";
}
export function localizePath(path: string, locale: Locale) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const bare = stripLocale(path);
  // Media/download URLs are shared assets, not translated document routes.
  const pathname = bare.split(/[?#]/)[0];
  if (
    /^\/(posts|icons|download|portrhythm)(\/|$)/.test(pathname) ||
    /\.(pdf|png|jpe?g|gif|webp|svg|ico|mp4|webm|mp3|zip)$/i.test(pathname)
  )
    return bare;
  if (/^\/(api|blog\/edit|test)(\/|\?|#|$)/.test(bare)) return bare;
  return locale === "ko" ? bare : `/${locale}${bare === "/" ? "" : bare}`;
}
export function englishLabel(url: string) {
  return url
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
