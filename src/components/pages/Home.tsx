import { getTranslations } from "@/lib/i18n/translations";
import { messages, categoryLabel } from "@/lib/i18n/messages";
import { englishLabel, type Locale } from "@/lib/i18n/routing";
import PortRhythmCard from "@/components/PortRhythmCard";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "@/components/i18n/Link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MainService } from "@/config/apis";
import { ImageUrl } from "@/lib/PostUtils/getImageUrl";
import AdComponent from "@/components/ads/adsense";

const Home = async ({ locale = "ko" }: { locale?: Locale }) => {
  const translations =
    locale === "ko" ? new Map() : await getTranslations(locale);
  const t = messages[locale];
  const [recentPosts, hotPosts] = await Promise.all([
    MainService().getRecent({ take: 10 }),
    MainService().getHot({ take: 10 }),
  ]);

  const CardComponent = ({ post }: { post: MainResponse.PostType }) => {
    return (
      <Card className="group relative h-full overflow-hidden rounded-xl border-0 bg-white/80 p-0 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white dark:bg-slate-900/10 dark:hover:bg-slate-900">
        {post.thumbnail_url && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={ImageUrl(post.thumbnail_url)}
              alt={
                translations.get(String(post.id))?.title ||
                (locale === "ko" ? post.nameko : post.name || post.nameko)
              }
              fill
              className="object-cover opacity-10 dark:opacity-20"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 from-white/40 dark:from-slate-900/40" />
          </div>
        )}
        <CardContent className="flex h-full flex-col justify-between gap-4 p-5">
          <Link
            href={`/blog/post/${post.id}-${post.url}`}
            key={post.id}
            className="text-text-foreground line-clamp-2 text-sm font-medium transition-colors duration-200 hover:text-gray-900 hover:underline dark:hover:text-slate-200"
          >
            {translations.get(String(post.id))?.title ||
              (locale === "ko" ? post.nameko : post.name || post.nameko)}
          </Link>
          <div className="flex flex-col gap-1.5">
            <Link
              href={`/blog/${post.Series.Subject.Category.url}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              <span className="text-gray-500 dark:text-slate-300">#</span>
              <span className="truncate">
                {locale === "ko"
                  ? post.Series.Subject.Category.nameko
                  : categoryLabel(post.Series.Subject.Category.url, locale) ||
                    englishLabel(post.Series.Subject.Category.url)}
              </span>
            </Link>
            <Link
              href={`/blog/${post.Series.Subject.Category.url}/${post.Series.Subject.url}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              <span className="text-gray-500 dark:text-slate-300">#</span>
              <span className="truncate">
                {locale === "ko"
                  ? post.Series.Subject.nameko
                  : englishLabel(post.Series.Subject.url)}
              </span>
            </Link>
            <Link
              href={`/blog/${post.Series.Subject.Category.url}/${post.Series.Subject.url}#${locale === "ko" ? post.Series.nameko : englishLabel(post.Series.url)}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              <span className="text-gray-500 dark:text-slate-300">#</span>
              <span className="truncate">
                {locale === "ko"
                  ? post.Series.nameko
                  : englishLabel(post.Series.url)}
              </span>
            </Link>
          </div>
          <div className="text-right text-[0.7rem] font-medium text-gray-500 dark:text-slate-300">
            {dayjs(post.init_date).locale("ko").format("YYYY-MM-DD")}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="px-4">
      <div className="mt-20 mb-5 text-4xl font-bold text-gray-900 dark:text-slate-200">
        🖐️ Hi, There
      </div>
      <p className="text-sm text-gray-600 dark:text-slate-400">
        {locale === "ko" ? (
          <>
            이 블로그는 데스크톱과 다크 모드에 최적화되어있습니다
            <br /> This blog is optimized for desktop and dark mode
          </>
        ) : (
          t.desktopNote
        )}
      </p>

      <div className="mt-8">
        <PortRhythmCard />
      </div>
      <div className="mt-10 mb-5 text-4xl font-bold text-gray-900 dark:text-slate-200">
        📰 {locale === "ko" ? "Recent Posts" : t.recent}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-3 lg:-ml-4">
          {recentPosts.map((post: MainResponse.PostType) => (
            <CarouselItem
              key={post.id}
              className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 md:pl-3 lg:basis-1/5 lg:pl-4"
            >
              <CardComponent post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div className="mt-10 mb-5 text-4xl font-bold text-gray-900 dark:text-slate-200">
        🔥 {locale === "ko" ? "Hot Posts" : t.hot}
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-3 lg:-ml-4">
          {hotPosts.map((post: MainResponse.PostType) => (
            <CarouselItem
              key={post.id}
              className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 md:pl-3 lg:basis-1/5 lg:pl-4"
            >
              <CardComponent post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      <div className="mt-10 mb-5 text-4xl font-bold text-gray-900 dark:text-slate-200">
        ⭐️ {locale === "ko" ? "Advertise" : t.advertise}
      </div>
      <AdComponent adSlot="4462031713" adFormat="autorelaxed" />
    </div>
  );
};

export default Home;
