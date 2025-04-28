import React from "react";
import { FaSitemap, FaCogs } from "react-icons/fa";
import Image from "next/image";

const structure = [
  {
    icon: <FaSitemap className="text-2xl text-blue-500" />,
    name: "디렉토리/라우팅 구조",
    desc: "app 디렉토리, 동적 라우팅, MDX/gray-matter/rehype로 콘텐츠 관리",
  },
  {
    icon: <FaSitemap className="text-2xl text-blue-500" />,
    name: "DB/스토리지 분리",
    desc: "Prisma+Supabase, S3로 데이터/이미지 분리 관리 (1,000+ 포스트/이미지)",
  },
];

const Page4 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <h1 className="mb-6 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      구조
    </h1>
    <div className="mb-8 rounded-2xl border bg-white p-6 shadow-lg dark:bg-gray-900">
      <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
        <FaCogs className="text-blue-500" />
        프로젝트 구조 & 주요 환경
      </h3>
      <ul className="mb-2 list-disc pl-5 text-base">
        <li>Next.js 14 기반 app 디렉토리 구조, 동적 라우팅 적극 활용</li>
        <li>MDX, gray-matter, rehype 등으로 마크다운 기반 컨텐츠 관리</li>
        <li>Supabase(PostgreSQL) + Prisma로 DB/인증/스토리지 통합</li>
        <li>이미지 최적화: Vercel, S3, WebP, CDN, Lambda 활용</li>
        <li>CI/CD: GitHub Actions, Vercel 자동 배포</li>
        <li>SEO, 반응형, 빠른 로딩, 사용자 경험 극대화</li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-4">
        <Image
          src="https://cdn.promleeblog.com/etc/promleeblog/diagram.webp"
          alt="기술스택 다이어그램"
          width={1000}
          height={120}
          className="rounded-xl border"
        />
      </div>
      <div className="mt-4 text-xs text-gray-500">
        참고:{" "}
        <a
          href="https://www.promleeblog.com/blog/post/111-stack-library-blog"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          블로그에 사용된 스택과 라이브러리
        </a>
        ,{" "}
        <a
          href="https://www.promleeblog.com/blog/post/112-next-project-init"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Next.js 프로젝트 구조
        </a>
      </div>
    </div>
    <div className="mt-8 flex flex-col gap-6">
      {structure.map((s, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow dark:bg-gray-900"
        >
          {s.icon}
          <div>
            <div className="mb-1 text-lg font-bold">{s.name}</div>
            <div className="text-base">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Page4;
