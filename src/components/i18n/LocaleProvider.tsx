"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n/routing";

const LocaleContext = createContext<Locale>("ko");
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
export const useLocale = () => useContext(LocaleContext);
