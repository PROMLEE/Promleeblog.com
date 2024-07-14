"use client";
import { useEffect, useState } from "react";
import { Link } from "@/config/types/apis";
import {
  AddCategory,
  AddSubject,
  AddSeries,
  AddPost,
} from "@/components/editpost";

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
  name: string;
}

const page = () => {
  const [Links, setLinks] = useState<Link[]>([]);
  const [addnum, setAddnum] = useState(0);
  const [category, setCategory] = useState<names>({
    url: "",
    id: null,
    name: "",
  });
  const [subject, setSubject] = useState<names>({
    url: "",
    id: null,
    name: "",
  });
  const [series, setSeries] = useState<names>({ url: "", id: null, name: "" });
  const [post, setPost] = useState<names>({ url: "", id: null, name: "" });
  const comps = [
    <AddCategory />,
    <AddSubject category_id={category.id || 0} />,
    <AddSeries subject_id={subject.id || 0} />,
    <AddPost series_id={series.id || 0} />,
  ];
  useEffect(() => {
    getList().then((data) => {
      setLinks(data);
    });
  }, []);
  useEffect(() => {
    setAddnum(0);
  }, [category.id, subject.id, series.id, post.id]);
  const blockstyle =
    "flex flex-1 flex-col gap-2 border p-2 border-text min-h-64 overflow-hidden select-none";
  const titlestyle =
    "rounded-md bg-slate-400 p-2 text-center font-bold text-primary mb-3";
  const pstyle =
    "block overflow-hidden text-ellipsis whitespace-nowrap text-xs hover:cursor-pointer";
  const buttonstyle = "ml-5 rounded bg-primary-foreground px-1 w-5";
  return (
    <>
      <div className="flex min-h-64 w-full rounded-lg py-10">
        <div className={blockstyle}>
          <h2 className={titlestyle}>
            카테고리
            <button
              className={buttonstyle}
              onClick={() => {
                setAddnum(0);
              }}
            >
              +
            </button>
          </h2>
          {Links.map((item) => (
            <div
              key={item.id}
              className={`${item.id === category.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
            >
              <p
                onClick={() => {
                  setCategory({
                    url: item.url,
                    id: item.id,
                    name: item.nameko,
                  });
                  setSubject({ url: "", id: null, name: "" });
                  setSeries({ url: "", id: null, name: "" });
                  setPost({ url: "", id: null, name: "" });
                }}
                className={pstyle}
              >
                {item.ord}. {item.nameko}
              </p>
            </div>
          ))}
        </div>
        <div className={blockstyle}>
          <h2 className={titlestyle}>
            주제
            <button
              className={buttonstyle}
              onClick={() => {
                setAddnum(1);
              }}
            >
              +
            </button>
          </h2>
          {Links.find((link) => link.id === category.id)?.Subject.map(
            (item) => (
              <div
                key={item.id}
                className={`${item.id === subject.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
              >
                <p
                  onClick={() => {
                    setSubject({
                      url: item.url,
                      id: item.id,
                      name: item.nameko,
                    });
                    setSeries({ url: "", id: null, name: "" });
                    setPost({ url: "", id: null, name: "" });
                  }}
                  className={pstyle}
                >
                  {item.category_no}. {item.nameko}
                </p>
              </div>
            ),
          )}
        </div>
        <div className={blockstyle}>
          <h2 className={titlestyle}>
            시리즈
            <button
              className={buttonstyle}
              onClick={() => {
                setAddnum(2);
              }}
            >
              +
            </button>
          </h2>
          {Links.find((link) => link.id === category.id)
            ?.Subject.find((link) => link.id === subject.id)
            ?.Series.map((item) => (
              <div
                key={item.id}
                className={`${item.id === series.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
              >
                <p
                  onClick={() => {
                    setSeries({
                      url: item.url,
                      id: item.id,
                      name: item.nameko,
                    });
                    setPost({ url: "", id: null, name: "" });
                  }}
                  className={pstyle}
                >
                  {item.subject_no}. {item.nameko}
                </p>
              </div>
            ))}
        </div>
        <div className={blockstyle}>
          <h2 className={titlestyle}>
            포스트
            <button
              className={buttonstyle}
              onClick={() => {
                setAddnum(3);
              }}
            >
              +
            </button>
          </h2>
          {Links.find((link) => link.id === category.id)
            ?.Subject.find((link) => link.id === subject.id)
            ?.Series.find((link) => link.id === series.id)
            ?.Post.map((item) => (
              <div
                key={item.id}
                className={`${item.id === post.id && "bg-third dark:bg-slate-600"} rounded-md p-2`}
              >
                <p
                  onClick={() =>
                    setPost({ url: item.url, id: item.id, name: item.nameko })
                  }
                  className={pstyle}
                >
                  {item.series_no}. {item.nameko}
                </p>
              </div>
            ))}
        </div>
      </div>
      {comps[addnum]}
    </>
  );
};

export default page;
