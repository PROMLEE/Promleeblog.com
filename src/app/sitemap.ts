import { localizedSitemap } from "@/lib/i18n/sitemap";
export const revalidate = 86400; // 1일. 글 수정 시 /sitemap.xml은 revalidate 라우트가 갱신한다.
export default function sitemap() {
  return localizedSitemap();
}
