// 이 페이지는 문제해결 사례 통합으로 Page4에서 확인하실 수 있습니다.
import React from "react";
import { FaBug, FaMagic } from "react-icons/fa";

const devCases = [
  {
    icon: <FaBug className="text-xl text-red-400" />,
    title: "라우팅/마이그레이션",
    problem:
      "Next.js 14/15 app 라우팅에서 문서/예제 부족과 breaking change로 시행착오 다수.",
    solution:
      "공식 문서, 깃헙 이슈, 실험 반복. SSR/CSR/ISR 혼합 구조로 단계별 마이그레이션.",
    result: "2회 대규모 마이그레이션, 주요 버그 10건 이상 직접 해결.",
    link: "https://www.promleeblog.com/blog/post/113-next-app-routing",
    linkText: "Next.js App 라우팅 경험",
  },
  {
    icon: <FaMagic className="text-xl text-pink-500" />,
    title: "스타일링 & Tailwind 커스텀",
    problem:
      "SSR 환경에서 CSS-in-JS 문제, Tailwind 커스텀/컴포넌트 스타일링 어려움.",
    solution:
      "Tailwind config, shadcn, CSS 모듈 등 조합. SSR/CSR 모두에서 일관된 스타일 구현.",
    result: "30+ 커스텀 컴포넌트, 2가지 테마 지원.",
    link: "https://www.promleeblog.com/blog/post/121-tailwind-custom-several-ways",
    linkText: "Tailwind 커스텀 방법 정리",
  },
];

const Page5 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <h1 className="mb-8 text-center text-3xl font-bold text-blue-700 dark:text-blue-400">
      개발/운영 문제해결 사례 (1)
    </h1>
    <div className="flex flex-col gap-10">
      {devCases.map((c, i) => (
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

export default Page5;
