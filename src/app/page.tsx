import dayjs from "dayjs";
import Link from "next/link";

const Page = async () => {
  let recentPosts;
  try {
    recentPosts = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/main/recent?take=5`,
      { next: { revalidate: 3600 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    recentPosts = [
      {
        id: "1",
        title: "Network Intro",
        url: "intro",
        init_date: "2021-09-01T00:00:00.000Z",
        name: "Network Intro",
        nameko: "네트워크 도입부",
      },
    ];
  }
  return (
    <div>
      <div className={"my-10 text-4xl font-bold"}>{" 🖐️ Hi, There"}</div>
      <br />이 블로그는 현재 데스크톱과 다크 모드에 최적화되어있습니다
      <br /> This blog is optimized for desktop and dark mode
      <div className={"my-10 text-4xl font-bold"}>{" 📰 Recent Posts"}</div>
      <div>
        {recentPosts.map((post: any) => (
          <Link
            href={`/blog/post/${post.url}`}
            key={post.id}
            className={"flex w-full justify-between"}
          >
            <div>{post.nameko}</div>
            <div>
              {dayjs(post.init_date).locale("ko").format("YYYY년 MM월 DD일")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
