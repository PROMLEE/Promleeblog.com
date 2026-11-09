import PortRhythmCard from "@/components/PortRhythmCard";
import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { Loading } from "@/components/Loading";
import Giscus from "@/components/posts/Giscus";
import { LocalizedDate } from "@/components/LocalizeDate";
import ViewIncrement from "@/components/mdx/viewIncrement";
import AdComponent from "@/components/ads/adsense";

import type { Locale } from "@/lib/i18n/routing";
export default function ArticleContent({
  markdownsource,
  locale = "ko",
  notice,
  originalContent,
}: {
  markdownsource: PostResponse.GetPost["data"];
  locale?: Locale;
  notice?: React.ReactNode;
  originalContent?: string;
}) {
  return (
    <>
      <ViewIncrement postId={String(markdownsource.id)} />
      <Toup />
      <Suspense fallback={<Loading />}>
        <BreadCrumb params={markdownsource} locale={locale} />
        {notice}
        <MdxHeader
          props={{
            nameko: markdownsource.nameko,
            name: markdownsource.name,
            thumbnail_url: markdownsource.thumbnail_url,
          }}
        />
        <div className="mb-5 ml-auto text-right">
          📅 <LocalizedDate isoString={markdownsource.init_date} />
        </div>
        <AdComponent
          adSlot="7985984960"
          adFormat="fluid"
          layoutKey="-fb+5w+4e-db+86"
        />
        <div className="prose dark:prose-invert my-5 min-h-[100vh] scroll-smooth focus:scroll-auto">
          <RightSidebarComp content={markdownsource.posting} />
          <MdxBody
            content={markdownsource.posting}
            originalContent={originalContent}
            locale={locale}
          />
        </div>
        {locale === "ko" && (
          <div className="my-8 md:hidden">
            <PortRhythmCard compact />
          </div>
        )}
        <AdComponent
          adSlot="6830024817"
          adFormat="fluid"
          layoutKey="-fb+5w+4e-db+86"
        />
        <div className="h-10" />
        <Giscus />
      </Suspense>
      <Todown />
    </>
  );
}
