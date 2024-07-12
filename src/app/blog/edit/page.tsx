"use client";
import { useEffect, useState } from "react";
import { Link } from "@/config/types/apis";

const getList = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`, {
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .then((data) => data.data);
};

interface names {
  url: string;
  id: number | null;
}

const page = () => {
  const [Links, setLinks] = useState<Link[]>([]);
  const [category, setCategory] = useState<names>({ url: "", id: null });
  const [subject, setSubject] = useState<names>({ url: "", id: null });
  const [series, setSeries] = useState<names>({ url: "", id: null });
  const [post, setPost] = useState<names>({ url: "", id: null });
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
  const pstyle =
    "block overflow-hidden text-ellipsis whitespace-nowrap text-xs hover:cursor-pointer";
  const buttonstyle = "ml-5 rounded bg-primary-foreground px-1";
  return (
    <div className="flex min-h-64 w-full rounded-lg p-10">
      <div className={blockstyle}>
        <h2 className={titlestyle}>
          카테고리
          <button className={buttonstyle} onClick={() => {}}>
            +
          </button>
        </h2>
        {Links.map((item) => (
          <div
            key={item.id}
            className={`${item.id === category.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
          >
            <p
              onClick={() => setCategory({ url: item.url, id: item.id })}
              className={pstyle}
            >
              {item.ord}. {item.nameko}
            </p>
          </div>
        ))}
      </div>
      <div className={blockstyle}>
        <h2 className={titlestyle}>주제</h2>
        {Links.find((link) => link.id === category.id)?.Subject.map((item) => (
          <div
            key={item.id}
            className={`${item.id === subject.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
          >
            <p
              onClick={() => setSubject({ url: item.url, id: item.id })}
              className={pstyle}
            >
              {item.category_no}. {item.nameko}
            </p>
          </div>
        ))}
      </div>
      <div className={blockstyle}>
        <h2 className={titlestyle}>시리즈</h2>
        {Links.find((link) => link.id === category.id)
          ?.Subject.find((link) => link.id === subject.id)
          ?.Series.map((item) => (
            <div
              key={item.id}
              className={`${item.id === series.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
            >
              <p
                onClick={() => setSeries({ url: item.url, id: item.id })}
                className={pstyle}
              >
                {item.subject_no}. {item.nameko}
              </p>
            </div>
          ))}
      </div>
      <div className={blockstyle}>
        <h2 className={titlestyle}>포스트</h2>
        {Links.find((link) => link.id === category.id)
          ?.Subject.find((link) => link.id === subject.id)
          ?.Series.find((link) => link.id === series.id)
          ?.Post.map((item) => (
            <div
              key={item.id}
              className={`${item.id === post.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
            >
              <p
                onClick={() => setPost({ url: item.url, id: item.id })}
                className={pstyle}
              >
                {item.series_no}. {item.nameko}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
