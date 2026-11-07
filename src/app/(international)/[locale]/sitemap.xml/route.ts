import { isTranslationLocale } from "@/lib/i18n/routing";
import { localizedSitemap, sitemapXml } from "@/lib/i18n/sitemap";
export const dynamic = "force-dynamic";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isTranslationLocale(locale))
    return new Response("Not found", { status: 404 });
  return new Response(sitemapXml(await localizedSitemap(locale)), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
