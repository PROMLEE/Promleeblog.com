import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  localeCookie,
  localizePath,
  type Locale,
} from "./lib/i18n/routing";

function browserLocale(header: string): Locale {
  const preferences = header.split(",").map((entry) => {
    const [range, ...parameters] = entry.trim().toLowerCase().split(";");
    const quality = parameters
      .map((value) => value.trim())
      .find((value) => value.startsWith("q="));
    return {
      language: range.split("-")[0],
      weight: quality === undefined ? 1 : Number(quality.slice(2)),
    };
  });
  const supported = preferences.filter(
    ({ weight }) => weight > 0 && weight <= 1,
  );
  supported.sort((a, b) => b.weight - a.weight);
  for (const { language } of supported) {
    if (isLocale(language)) return language;
  }
  return "ko";
}

export function middleware(request: NextRequest) {
  const preference = request.cookies.get(localeCookie)?.value;
  const locale =
    preference && isLocale(preference)
      ? preference
      : browserLocale(request.headers.get("accept-language") ?? "");

  const destination = request.nextUrl.clone();
  destination.pathname = localizePath("/", locale);
  const response =
    locale === "ko" ? NextResponse.next() : NextResponse.redirect(destination);

  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: "/",
};
