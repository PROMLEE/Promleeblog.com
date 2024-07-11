"use client";
import { useEffect, useState } from "react";
interface Link {
  nameko: string;
  url: string;
  Subject: {
    nameko: string;
    url: string;
    Series: {
      nameko: string;
      id: number;
      Post: {
        id: number;
        url: string;
        nameko: string;
        lock: boolean;
      }[];
    }[];
  }[];
}

const getList = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`, {
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .then((data) => data.data);
};
const page = () => {
  const [Links, setLinks] = useState<Link[]>([]);
  const [category, setCategory] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [post, setPost] = useState<string>("");
  useEffect(() => {
    getList().then((data) => {
      setLinks(data);
      console.log(data);
    });
  }, []);
  const blockstyle =
    "flex flex-1 flex-col gap-2 border p-2 border-text min-h-64 overflow-hidden select-none";
  const titlestyle =
    "rounded-md bg-slate-400 p-2 text-center font-bold text-primary mb-3";
  return (
    <div className="flex min-h-64 w-full rounded-lg p-10">
      <div className={blockstyle}>
        <h2 className={titlestyle}>
          카테고리
          <button
            className="ml-5 rounded bg-primary-foreground px-1"
            onClick={() => {}}
          >
            +
          </button>
        </h2>
        {Links.map((item) => (
          <div
            key={item.url}
            className={`${item.url === category && "bg-third dark:bg-slate-600"} rounded-md p-2`}
          >
            <p onClick={() => setCategory(item.url)}>{item.nameko}</p>
          </div>
        ))}
      </div>
      <div className={blockstyle}>
        <h2 className={titlestyle}>주제</h2>
        {Links.find((link) => link.url === category)?.Subject.map((item) => (
          <div
            key={item.url}
            className={`${item.url === subject && "bg-third dark:bg-slate-600"} rounded-md p-2`}
          >
            <p onClick={() => setSubject(item.url)}>{item.nameko}</p>
          </div>
        ))}
      </div>
      <div className={blockstyle}>
        <h2 className={titlestyle}>시리즈</h2>
        {Links.find((link) => link.url === category)
          ?.Subject.find((link) => link.url === subject)
          ?.Series.map((item) => (
            <div
              key={item.id}
              className={`${item.id.toString() === series && "bg-third dark:bg-slate-600"} rounded-md p-2`}
            >
              <p onClick={() => setSeries(item.id.toString())}>{item.nameko}</p>
            </div>
          ))}
      </div>
      <div className={blockstyle}>
        <h2 className={titlestyle}>포스트</h2>
        {Links.find((link) => link.url === category)
          ?.Subject.find((link) => link.url === subject)
          ?.Series.find((link) => link.id.toString() === series)
          ?.Post.map((item) => (
            <div
              key={item.id}
              className={`${item.url === post && "bg-third dark:bg-slate-600"} rounded-md p-2`}
            >
              <p
                onClick={() => setPost(item.url)}
                className="block overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item.nameko}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
