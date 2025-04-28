import React from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiSupabase,
  SiVercel,
  SiGithub,
} from "react-icons/si";

const stacks = [
  {
    icon: <SiNextdotjs className="text-2xl text-black dark:text-white" />,
    name: "Next.js 14",
    desc: "최신 app 라우팅, SSR/ISR/CSR 혼합, SEO 최적화",
  },
  {
    icon: <SiTypescript className="text-2xl text-blue-600" />,
    name: "TypeScript",
    desc: "정적 타입, 코드 가독성 및 안정성 강화",
  },
  {
    icon: <SiTailwindcss className="text-2xl text-sky-400" />,
    name: "Tailwind CSS",
    desc: "유틸리티 기반 CSS, 반응형/SSR 호환",
  },
  {
    icon: <SiPrisma className="text-2xl text-gray-800 dark:text-white" />,
    name: "Prisma",
    desc: "ORM, PostgreSQL 연동, 타입 안전 DB 접근",
  },
  {
    icon: <SiSupabase className="text-2xl text-green-600" />,
    name: "Supabase",
    desc: "PostgreSQL 기반 DB, 인증/스토리지/API",
  },
  {
    icon: <SiVercel className="text-2xl text-black dark:text-white" />,
    name: "Vercel",
    desc: "배포/호스팅, Edge 기능 활용",
  },
  {
    icon: <SiGithub className="text-2xl text-gray-800 dark:text-white" />,
    name: "GitHub Actions",
    desc: "버전 관리, CI/CD 자동화",
  },
];

const Page3 = () => (
  <div className="mx-auto w-full max-w-2xl">
    <h1 className="mb-6 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      기술스택
    </h1>
    <div className="mb-8 flex flex-col gap-6">
      {stacks.map((s, i) => (
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

export default Page3;

