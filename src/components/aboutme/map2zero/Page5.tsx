import React from "react";
import Image from "next/image";

const images = [
  {
    src: "https://cdn.promleeblog.com/etc/map2zero/3.png",
    alt: "메인 UI",
    caption: "메인 페이지 UI",
  },
  {
    src: "https://cdn.promleeblog.com/etc/map2zero/4.png",
    alt: "매장 상세",
    caption: "매장 상세 정보",
  },
  {
    src: "https://cdn.promleeblog.com/etc/map2zero/5.png",
    alt: "리뷰 작성",
    caption: "리뷰 작성 화면",
  },
];

export const Page5 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      UI 예시 ①
    </h1>
    <div className="rounded-2xl border bg-white p-6 dark:bg-gray-900">
      <div className="mt-4 flex flex-wrap items-start justify-center gap-6">
        {images.map((img, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              src={img.src}
              alt={img.alt}
              width={200}
              height={120}
              className="mb-2 rounded-xl"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {img.caption}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
