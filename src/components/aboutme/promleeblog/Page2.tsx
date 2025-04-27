import React from "react";
import { FaBullseye } from "react-icons/fa";

const goals = [
  {
    title: "가독성",
    desc: "본문과 제목의 구분, 글씨 크기/색상, 기호·표·강조 등으로 읽기 편한 구조",
  },
  {
    title: "글 분류",
    desc: "카테고리-주제-시리즈-글의 트리 구조로 체계적 분류",
  },
  {
    title: "플랫폼과 콘텐츠의 분리",
    desc: "DB와 S3를 활용한 확장성/유지보수성 강화",
  },
  {
    title: "좋은 사용자 경험",
    desc: "빠른 로딩, 반응형 디자인, 직관적 UI",
  },
  {
    title: "SEO 최적화",
    desc: "검색엔진 노출 및 방문자 유입 극대화",
  },
];

export const Page2 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <h1 className="mb-6 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      블로그 목표/설계
    </h1>
    <div className="flex flex-col gap-6">
      {goals.map((g, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow dark:bg-gray-900"
        >
          <FaBullseye className="mt-1 text-2xl text-green-600" />
          <div>
            <div className="mb-1 text-lg font-bold">{g.title}</div>
            <div className="text-base">{g.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

