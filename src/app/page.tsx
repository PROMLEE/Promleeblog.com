import dayjs from "dayjs";
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

const Page = async () => {
  const recentPosts = await MainService().getRecent({ take: 10 });
  const hotPosts = await MainService().getHot({ take: 10 });

  const CardComponent = ({ post }: { post: MainResponse.PostType }) => {
    return (
      <Card>
        <CardContent className="flex aspect-square select-none flex-col justify-between rounded-lg bg-primary p-5">
          <Link
            href={`/blog/post/${post.id}-${post.url}`}
            key={post.id}
            className="text-overflow hover:text-blue-300 hover:underline"
          >
            {post.nameko}
          </Link>
          <div className="my-2 flex flex-col gap-1">
            <Link
              href={`/blog/${post.Series.Subject.Category.url}`}
              className="truncate text-xs text-gray-400 hover:text-blue-300 hover:underline"
            >
              # {post.Series.Subject.Category.nameko}
            </Link>
            <Link
              href={`/blog/${post.Series.Subject.Category.url}/${post.Series.Subject.url}`}
              className="truncate text-xs text-gray-400 hover:text-blue-300 hover:underline"
            >
              # {post.Series.Subject.nameko}
            </Link>
            <Link
              href={`/blog/${post.Series.Subject.Category.url}/${post.Series.Subject.url}#${post.Series.nameko}`}
              className="truncate text-xs text-gray-400 hover:text-blue-300 hover:underline"
            >
              # {post.Series.nameko}
            </Link>
          </div>
          <div className="h-2 text-right text-[0.7rem] text-gray-400">
            {dayjs(post.init_date).locale("ko").format("YYYY-MM-DD")}
          </div>
        </CardContent>
      </Card>
    );
  };
  return (
    <div>
      <div className={"mb-5 mt-20 text-4xl font-bold"}>{" 🖐️ Hi, There"}</div>이
      블로그는 데스크톱과 다크 모드에 최적화되어있습니다
      <br /> This blog is optimized for desktop and dark mode
      <div className={"mb-5 mt-10 text-4xl font-bold"}>
        {" 📰 Recent Posts"}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {recentPosts.map((post: MainResponse.PostType) => (
            <CarouselItem
              key={post.id}
              className="basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <CardComponent post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className={"mb-5 mt-10 text-4xl font-bold"}>{" 🔥 Hot Posts"}</div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {hotPosts.map((post: MainResponse.PostType) => (
            <CarouselItem
              key={post.id}
              className="basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <CardComponent post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Page;
