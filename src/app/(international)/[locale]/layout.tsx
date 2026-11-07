import SiteLayout from "@/components/SiteLayout";
import { isTranslationLocale, translationLocales } from "@/lib/i18n/routing";
import { notFound } from "next/navigation";
export { metadata } from "@/components/SiteLayout";
export function generateStaticParams() {
  return translationLocales.map((locale) => ({ locale }));
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isTranslationLocale(locale)) notFound();
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
