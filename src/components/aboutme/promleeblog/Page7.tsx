import React from "react";
import { FaChartLine, FaSync } from "react-icons/fa";

const perfCases = [
  {
    icon: <FaChartLine className="text-xl text-orange-500" />,
    title: "실전 운영 & 최적화",
    problem: "느린 로딩, SEO 미흡, 사용자 이탈 문제를 경험.",
    solution:
      "코드 스플리팅, 이미지/데이터 최적화, SEO 개선, UI/UX 반복 개선을 통해 성능을 높임.",
    result: "구글 검색 노출 15회/일 → 300회/일, CTR 3.5%로 대폭 개선.",
    link: "https://www.promleeblog.com/blog/post/177-blog-optimizing",
    linkText: "블로그 최적화 경험",
  },
  {
    icon: <FaSync className="text-xl text-purple-500" />,
    title: "ISR 경험",
    problem: "정적/동적 데이터 균형, 빌드/배포 속도와 실시간성 모두 필요했음.",
    solution:
      "ISR(Incremental Static Regeneration) 적용으로 자주 바뀌는 데이터만 빠르게 갱신.",
    result: "빌드 시간 40% 단축, 실시간 데이터 반영.",
    link: "https://www.promleeblog.com/blog/post/195-blog-isr",
    linkText: "ISR 경험 자세히 보기",
  },
];

export const Page7 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <h1 className="mb-8 text-center text-3xl font-bold text-blue-700 dark:text-blue-400">
      최적화/성과 문제해결 사례
    </h1>
    <div className="flex flex-col gap-10">
      {perfCases.map((c, i) => (
        <div
          key={i}
          className="mb-2 rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900"
        >
          <div className="mb-4 flex items-center gap-3">
            {c.icon}
            <span className="text-lg font-bold tracking-tight">{c.title}</span>
          </div>
          <div className="space-y-3">
            <div className="text-base">
              <span className="font-semibold">문제</span>
              <span className="mx-2 text-gray-400">|</span>
              {c.problem}
            </div>
            <div className="text-base">
              <span className="font-semibold">해결</span>
              <span className="mx-2 text-gray-400">|</span>
              {c.solution}
            </div>
            <div className="text-base">
              <span className="font-semibold">성과</span>
              <span className="mx-2 text-gray-400">|</span>
              {c.result}
            </div>
          </div>
          {c.link && (
            <div className="mt-5 border-t pt-3 text-sm font-medium text-gray-400">
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {c.linkText}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
