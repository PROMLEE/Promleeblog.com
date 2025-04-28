// import { JSX } from "react";
// import { FaLink, FaGithub } from "react-icons/fa";
// import {
//   SiReact,
//   SiTypescript,
//   SiAmazon,
//   SiNaver,
//   SiNextdotjs,
// } from "react-icons/si";

// const techIcons: Record<string, JSX.Element> = {
//   React: <SiReact size={22} color="#61DAFB" />,
//   Typescript: <SiTypescript size={22} color="#3178C6" />,
//   "Next.js": <SiNextdotjs size={22} color="#000" className="dark:text-white" />,
//   "AWS(S3, CloudFront)": <SiAmazon size={22} color="#FF9900" />,
//   "Naver Maps API": <SiNaver size={22} color="#03CF5D" />,
// };

const projects = [
  {
    name: "Map2Zero (제로웨이스트 매장 지도)",
    period: "2024.01.05 ~ 2024.02.25",
    iconUrl:
      "https://github.com/PROMLEE/map2zero-frontend/raw/main/image/logo.png",
    tech: ["React", "Typescript", "Naver Maps API", "AWS(S3, CloudFront)"],
    link: { url: "https://map2zero.vercel.app", label: "서비스 바로가기" },
    github: {
      url: "https://github.com/PROMLEE/map2zero-frontend",
      label: "소스코드 보기",
    },
    detailPage: {
      url: "/aboutme/map2zero",
      label: "프로젝트 상세보기",
    },
    featured: true,
    desc: [
      "UMC 5기 데모데이 출품작으로 제작된 제로 웨이스트 매장 검색/추천 및 소셜 리뷰 서비스",
      "프로젝트 팀장으로 개발 주도 및 소셜 로그인, 지도 API 담당",
      "네이버 지도 연동하여 매장의 위치 정보를 시각화하고 사용자의 현재 위치 기반 검색 기능 구현",
      "소셜 로그인 기능과 리뷰 시스템을 통해 커뮤니티 활성화 지원",
      "실 사용자 100명 이상 유치 및 Neordinary Demoday 출품",
      "지속가능한 소비를 위한 ESG 서비스로 환경 보호에 기여",
    ],
    teamSize: "5명 (프론트엔드 3명, 백엔드 2명)",
    role: "프론트엔드 팀장",
  },
  {
    name: "PROTOTYNE (프로토타입 체험 플랫폼)",
    period: "2024.03.01 ~ 2024.04.15",
    iconUrl: "https://cdn.promleeblog.com/etc/logo/prototyne-logo.png",
    tech: ["Next.js", "Typescript", "AWS(S3, CloudFront)"],
    github: {
      url: "https://github.com/PROMLEE/prototyne-frontend",
      label: "소스코드 보기",
    },
    desc: [
      "UMC 6기 프로젝트로 개발된 초기 스타트업과 사용자를 연결하는 프로토타입 체험 플랫폼",
      "스타트업은 개발한 서비스의 프로토타입을 등록하고, 사용자는 체험 후 피드백을 제공하는 서비스",
      "Next.js를 활용한 풀스택 개발 및 AWS 인프라 구축 담당",
      "서버 파트 팀장으로 백엔드 아키텍처 설계 및 API 개발 주도",
      "사용자 경험 개선 및 효율적인 데이터 처리를 위한 최적화 작업 수행",
    ],
    teamSize: "6명 (프론트엔드 3명, 백엔드 3명)",
    role: "서버 파트 팀장",
  },
];

export default function TeamProjects() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
        <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          팀 프로젝트
        </span>
      </h1>
      <div className="space-y-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl border bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/50 ${
              project.featured ? "border-green-500 dark:border-teal-500" : ""
            }`}
          >
            {project.featured && (
              <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-r from-green-600 to-teal-600 p-2 text-xs font-bold text-white shadow-lg">
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

                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-200">
                      팀 규모: {project.teamSize}
                    </span>
                    <span className="rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900/50 dark:text-teal-200">
                      역할: {project.role}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {project.desc.map((text, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mt-1 mr-2 text-green-500">•</span>
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
                      className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 transition-colors hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:hover:bg-green-800/60"
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
                      className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 px-3 py-1 text-sm font-medium text-white transition-transform hover:scale-105"
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
