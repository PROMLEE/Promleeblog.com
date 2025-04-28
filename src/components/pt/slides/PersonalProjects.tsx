// import { JSX } from "react";
// import {
//   SiNextdotjs,
//   SiSupabase,
//   SiPostgresql,
//   SiAmazon,
//   SiGithubactions,
//   SiKotlin,
// } from "react-icons/si";

// const techIcons: Record<string, JSX.Element> = {
//   "Next.js": <SiNextdotjs size={22} color="#000" className="dark:text-white" />,
//   Supabase: <SiSupabase size={22} color="#3FCF8E" />,
//   PostgreSQL: <SiPostgresql size={22} color="#336791" />,
//   "AWS(S3, Cloudfront, Lambda)": <SiAmazon size={22} color="#FF9900" />,
//   "Github Actions": <SiGithubactions size={22} color="#2088FF" />,
//   Kotlin: <SiKotlin size={22} color="#7F52FF" />,
// };

// const highlight = (text: string) => {
//   const regex =
//     /(\d+\.?\d*%|\d+ms|\d+초|\d+명|\d+점|개선|최적화|런칭|유치|출품|성공|도입|도전|신규|성과|효율|안정성|성능|실사용자|데모데이|출시|최초|기록|달성)/g;
//   let count = 0;
//   return text.split(regex).map((part, i) => {
//     if (i % 2 === 1 && count < 2) {
//       count++;
//       return (
//         <span key={i} className="font-bold text-white">
//           {part}
//         </span>
//       );
//     }
//     return part;
//   });
// };

const projects = [
  {
    name: "Promleeblog.com (개인 블로그)",
    period: "2024.04.20 ~",
    iconUrl: "/icons/android-chrome-192x192.png",
    tech: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "AWS(S3, Cloudfront, Lambda)",
      "Github Actions",
    ],
    link: { url: "https://www.promleeblog.com", label: "서비스 바로가기" },
    github: {
      url: "https://github.com/PROMLEE/Promleeblog.com",
      label: "소스코드 보기",
    },
    detailPage: {
      url: "/aboutme/promleeblog",
      label: "프로젝트 상세보기",
    },
    featured: true,
    desc: [
      "내가 쓰고 싶은 기술을 마음껏 사용해본 연습/실전용 블로그 사이트",
      "Supabase 데이터 캐싱, revalidate/mutate 등으로 유저 체감 속도 35% 개선, UX 이탈률 18% 감소",
      "CloudFront 이미지 캐싱 최적화, Lambda@Edge로 WebP 변환 및 LCP 1.4s→0.9s, 이미지 응답 1.2s→180ms",
      "Core Web Vitals(LCP, CLS 등) 최적화, SEO 100점, Performance 90점 이상 유지",
      "SSG/SSR/ISR 전략 혼합, 보안과 SEO 모두 확보, 3단 반응형 UI, 라이트/다크모드 지원",
      "하루 1000회 이상 구글 검색 노출, CTR 5%, 평균 300회 이상 조회수 기록",
    ],
  },
  {
    name: "Wear OS 워치페이스 개발",
    period: "2022.11.04 ~ 2023.06",
    iconUrl: "https://cdn.promleeblog.com/etc/watchface/watchface-logo.png",
    tech: ["Kotlin"],
    github: {
      url: "https://github.com/PROMLEE/Wear_Os_WatchFace",
      label: "소스코드 보기",
    },
    desc: [
      "스마트워치 배경화면을 직접 제작, WatchFace API/ComplicationSlotsManager로 다양한 정보 표시",
      "CurrentUserStyleRepository로 사용자 커스터마이징 지원, Spotless/ktlint로 코드 품질 관리",
      "모듈화 구조로 유지보수성 향상, 3년째 직접 사용 중인 나만의 워치페이스",
      "외국 오픈소스 분석, 집념과 끈기로 완성, 어려움 속에서도 끝까지 해내는 자신감 획득",
    ],
  },
];
export default function PersonalProjects() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          개인 프로젝트
        </span>
      </h1>
      <div className="space-y-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl border bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/50 ${
              project.featured ? "border-blue-500 dark:border-purple-500" : ""
            }`}
          >
            {project.featured && (
              <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-2 text-xs font-bold text-white shadow-lg">
                Featured
              </div>
            )}
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {project.iconUrl && (
                <div className="flex items-center justify-center md:w-1/6">
                  <img
                    src={project.iconUrl}
                    alt={project.name}
                    className="h-24 w-24 rounded-xl object-cover shadow-sm"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.period}
                  </span>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {project.desc.map((text, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mt-1 mr-2 text-blue-500">•</span>
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {project.link && (
                    <a
                      href={project.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      <span>🔗</span> {project.link.label}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <span>💻</span> {project.github.label}
                    </a>
                  )}
                  {project.detailPage && (
                    <a
                      href={project.detailPage.url}
                      className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-sm font-medium text-white transition-transform hover:scale-105"
                    >
                      <span>🔍</span> {project.detailPage.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
