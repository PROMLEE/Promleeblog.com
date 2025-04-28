import React from "react";
import { FaDatabase, FaImage } from "react-icons/fa";

const devCases = [
  {
    icon: <FaDatabase className="text-xl text-green-600" />,
    title: "데이터 관리 & Supabase",
    problem: "DB/인증/스토리지 통합 관리가 번거로웠음.",
    solution:
      "Prisma와 Supabase를 연동해 DB/인증/스토리지/이미지 업로드를 통합 관리.",
    result: "1,000개 이상의 포스트/이미지 관리, 인증/업로드 오류 0건.",
    link: "https://www.promleeblog.com/blog/post/105-supabase-data-fetching",
    linkText: "Supabase 데이터 관리",
  },
  {
    icon: <FaImage className="text-xl text-blue-500" />,
    title: "이미지 최적화 & CDN",
    problem: "이미지 증가로 인한 로딩 속도 저하와 트래픽 문제 발생.",
    solution:
      "S3+Lambda로 WebP 변환, Vercel+CDN 글로벌 캐싱, Next.js 이미지 최적화 기능을 적극 활용.",
    result: "평균 이미지 용량 60% 감소, LCP 1.2초 → 0.7초로 개선.",
    link: "https://www.promleeblog.com/blog/post/106-optimize-image-cdn",
    linkText: "이미지 최적화 경험",
  },
];

const Page6 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <h1 className="mb-8 text-center text-3xl font-bold text-blue-700 dark:text-blue-400">
      개발/운영 문제해결 사례 (2)
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

export default Page6;

