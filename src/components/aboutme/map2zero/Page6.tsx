import React from "react";
import Image from "next/image";

const images = [
  {
    src: "https://cdn.promleeblog.com/etc/map2zero/8.png",
    alt: "이벤트 UI",
    caption: "이벤트/프로모션 UI",
  },
  {
    src: "https://cdn.promleeblog.com/etc/map2zero/9.png",
    alt: "매장 등록",
    caption: "매장 등록/관리 화면",
  },
  {
    src: "https://cdn.promleeblog.com/etc/map2zero/10.png",
    alt: "지도 UI",
    caption: "지도 기반 매장 탐색",
  },
];

export const Page6 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      UI 예시 ②
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
