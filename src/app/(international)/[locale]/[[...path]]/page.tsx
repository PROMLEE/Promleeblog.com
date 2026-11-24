import { notFound } from "next/navigation";
import InternationalPage, {
  internationalMetadata,
} from "@/components/i18n/InternationalPage";
import { isTranslationLocale } from "@/lib/i18n/routing";

type Props = { params: Promise<{ locale: string; path?: string[] }> };
// 1주일. 글 수정은 /api/revalidate/post가 해당 경로만 즉시 갱신한다.
export const revalidate = 604800;
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
