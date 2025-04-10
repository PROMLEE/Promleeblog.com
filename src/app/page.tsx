import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

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

const Page = async () => {
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
              alt={post.nameko}
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
            className="line-clamp-2 text-sm font-medium text-gray-800 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-300/90 dark:hover:text-slate-200"
          >
            {post.nameko}
          </Link>
          <div className="flex flex-col gap-1.5">
            <Link
              href={`/blog/${post.Series.Subject.Category.url}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              <span className="text-gray-500 dark:text-slate-300">#</span>
              <span className="truncate">
                {post.Series.Subject.Category.nameko}
              </span>
            </Link>
            <Link
              href={`/blog/${post.Series.Subject.Category.url}/${post.Series.Subject.url}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              <span className="text-gray-500 dark:text-slate-300">#</span>
              <span className="truncate">{post.Series.Subject.nameko}</span>
            </Link>
            <Link
              href={`/blog/${post.Series.Subject.Category.url}/${post.Series.Subject.url}#${post.Series.nameko}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              <span className="text-gray-500 dark:text-slate-300">#</span>
              <span className="truncate">{post.Series.nameko}</span>
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
        이 블로그는 데스크톱과 다크 모드에 최적화되어있습니다
        <br /> This blog is optimized for desktop and dark mode
      </p>

      <div className="mt-10 mb-5 text-4xl font-bold text-gray-900 dark:text-slate-200">
        📰 Recent Posts
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
        🔥 Hot Posts
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
    </div>
  );
};

export default Page;
