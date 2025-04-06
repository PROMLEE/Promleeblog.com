"use client";
import { useEffect, useState } from "react";
import {
  AddCategory,
  AddSubject,
  AddSeries,
  AddPost,
  EditPost,
} from "@/components/editpost";
import { PostService } from "@/config/apis";
import { Button } from "@/components/ui/button";
import { IndexNowService } from "@/config/apis/service/indexnow";

interface names {
  url: string;
  id: number | null;
  name: string;
}

const Page = () => {
  const [Links, setLinks] = useState<PostResponse.GetLinks["data"]>([]);
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
    <AddCategory key={"addcategory"} />,
    <AddSubject category_id={category.id || 0} key={"addsubject"} />,
    <AddSeries subject_id={subject.id || 0} key={"addseries"} />,
    <AddPost series_id={series.id || 0} key={"addpost"} />,
    <EditPost
      series_id={series.id || 0}
      key={"editpost"}
      post_id={post.id || undefined}
      post_url={post.url || undefined}
    />,
  ];

  useEffect(() => {
    getpw();
    PostService()
      .getLinks()
      .then((res) => {
        setLinks(res);
      });
  }, []);
  const sendIndexNow = async () => {
    const basePath = "https://www.promleeblog.com/blog/";
    const Links = await PostService().getLinks();

    const list = [
      "https://www.promleeblog.com",
      "https://www.promleeblog.com/aboutme",
      "https://www.promleeblog.com/blog",
      "https://www.promleeblog.com/sitemap-tree",
    ];
    Links.map((category) => {
      list.push(basePath + category.url);
      category.Subject.map((sub) => {
        list.push(basePath + category.url + "/" + sub.url);
        sub.Series.map((series) => {
          series.Post.map((post) => {
            if (!post.lock) {
              list.push(basePath + "post/" + post.id + "-" + post.url);
            }
          });
        });
      });
    });
    IndexNowService()
      .sendUrlList({
        urlList: list,
        indexHost: "NAVER",
      })
      .then((res) => {
        if (res.status !== 200) {
          alert("요청 실패");
        } else {
          alert("요청 성공");
        }
      })
      .catch((error) => {
        console.error("IndexNow API fetch error:", error);
        alert("요청 실패");
      });
    IndexNowService()
      .sendUrlList({
        urlList: list,
        indexHost: "BING",
      })
      .then((res) => {
        if (res.status !== 200) {
          alert("요청 실패");
        } else {
          alert("요청 성공");
        }
      })
      .catch((error) => {
        console.error("IndexNow API fetch error:", error);
        alert("요청 실패");
      });
    await fetch(`/api/indexnow/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urlList: list,
      }),
    });
  };

  const checkGoogleIndexing = async () => {
    await fetch(
      `/api/indexnow/google?url=https://www.promleeblog.com/blog/post/${post.id}-${post.url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  const getpw = () => {
    if (typeof window !== "undefined") {
      if ("development" !== process.env.NEXT_PUBLIC_NODE_ENV) {
        alert("관리자용 페이지입니다.");
        window.location.href = "/";
      }
    }
  };
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
      <Button variant={"secondary"} className="m-5" onClick={sendIndexNow}>
        <span>indexNow 요청 보내기</span>
      </Button>
      <Button
        variant={"secondary"}
        className="m-5"
        onClick={checkGoogleIndexing}
      >
        <span>Google Indexing API 확인</span>
      </Button>
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
                  onClick={async () => {
                    if (item.id === post.id) {
                      await setPost({ url: "", id: null, name: "" });
                      setAddnum(3);
                      return;
                    } else {
                      await setPost({
                        url: item.url,
                        id: item.id,
                        name: item.nameko,
                      });
                      setAddnum(4);
                    }
                  }}
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

export default Page;
