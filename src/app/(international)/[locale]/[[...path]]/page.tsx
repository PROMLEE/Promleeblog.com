import { notFound } from "next/navigation";
import InternationalPage, {
  internationalMetadata,
} from "@/components/i18n/InternationalPage";
import { isTranslationLocale } from "@/lib/i18n/routing";

type Props = { params: Promise<{ locale: string; path?: string[] }> };
export const revalidate = 60;
export async function generateMetadata({ params }: Props) {
  const { locale, path = [] } = await params;
  if (!isTranslationLocale(locale)) notFound();
  return internationalMetadata(locale, path);
}
export default async function Page({ params }: Props) {
  const { locale, path = [] } = await params;
  if (!isTranslationLocale(locale)) notFound();
  return <InternationalPage locale={locale} path={path} />;
}
