"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    "flex flex-1 flex-col gap-2 border p-2 border-text h-64 overflow-hidden select-none";
  const titlestyle =
    "rounded-md bg-slate-400 p-2 text-center font-bold text-primary mb-3";
  return (
    <div className="flex min-h-64 w-full rounded-lg bg-primary p-10">
      <ScrollArea className={blockstyle}>
        <h2 className={titlestyle}>
          카테고리
          <button
            className="ml-5 rounded bg-primary-foreground p-1"
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
      </ScrollArea>
      <ScrollArea className={blockstyle}>
        <h2 className={titlestyle}>주제</h2>
        {Links.find((link) => link.url === category)?.Subject.map((item) => (
          <div
            key={item.url}
            className={`${item.url === subject && "bg-third dark:bg-slate-600"} rounded-md p-2`}
          >
            <p onClick={() => setSubject(item.url)}>{item.nameko}</p>
          </div>
        ))}
      </ScrollArea>
      <ScrollArea className={blockstyle}>
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
      </ScrollArea>
      <div className={blockstyle}>
        <h2 className={titlestyle}>포스트</h2>
        {Links.find((link) => link.url === category)
          ?.Subject.find((link) => link.url === subject)
          ?.Series.find((link) => link.id.toString() === series)
          ?.Post.map((item) => (
            <div
              key={item.id}
              className={`${item.url === post && "bg-third dark:bg-slate-600"} block overflow-hidden text-ellipsis whitespace-nowrap rounded-md p-2`}
              onClick={() => setPost(item.url)}
            >
              {item.nameko}
            </div>
          ))}
      </div>
      {/* <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="카테고리" />
        </SelectTrigger>
        <SelectContent>
          {Links.map((category) => (
            <SelectItem key={category.url} value={category.url}>
              {category.nameko}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setSubject(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="주제" />
        </SelectTrigger>
        <SelectContent>
          {Links.find(
            (link_category) => link_category.url === category,
          )?.Subject.map((subject) => (
            <SelectItem key={subject.url} value={subject.url}>
              {subject.nameko}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setSeries(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="시리즈" />
        </SelectTrigger>
        <SelectContent>
          {Links.find((link_category) => link_category.url === category)
            ?.Subject.find((link_subject) => link_subject.url === subject)
            ?.Series.map((series) => (
              <SelectItem key={series.id} value={series.id.toString()}>
                {series.nameko}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setPost(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="포스트" />
        </SelectTrigger>
        <SelectContent>
          {Links.find((link_category) => link_category.url === category)
            ?.Subject.find((link_subject) => link_subject.url === subject)
            ?.Series.find((link_series) => link_series.id.toString() === series)
            ?.Post.map((post) => (
              <SelectItem key={post.id} value={post.url}>
                {post.nameko}
              </SelectItem>
            ))}
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default page;
