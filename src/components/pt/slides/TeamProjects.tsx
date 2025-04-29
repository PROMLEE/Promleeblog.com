import { memo } from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { FaReact, FaAws, FaGitAlt, FaFigma, FaJava } from "react-icons/fa";
import { JSX } from "react";
import { FaLink, FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiTypescript,
  SiAmazon,
  SiNaver,
  SiNextdotjs,
  SiSpringboot,
} from "react-icons/si";

const techIcons: Record<string, JSX.Element> = {
  React: <SiReact size={22} color="#61DAFB" />,
  Typescript: <SiTypescript size={22} color="#3178C6" />,
  "Next.js": <SiNextdotjs size={22} color="#000" className="dark:text-white" />,
  "AWS(S3)": <SiAmazon size={22} color="#FF9900" />,
  "AWS(EC2, RDS)": <SiAmazon size={22} color="#FF9900" />,
  "Naver Maps API": <SiNaver size={22} color="#03CF5D" />,
  "Spring Boot": <SiSpringboot size={22} color="#6DB33F" />,
  Java: <FaJava size={22} color="#E76F00" />,
};

const projects = [
  {
    name: "Map2Zero (제로웨이스트 매장 지도)",
    period: "2024.01.05 ~ 2024.02.25",
    iconUrl:
      "https://github.com/PROMLEE/map2zero-frontend/raw/main/image/logo.png",
    tech: ["React", "Typescript", "Naver Maps API", "AWS(S3)"],
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
    iconUrl: "https://cdn.promleeblog.com/etc/logo-new/prototyne.png",
    tech: ["Spring Boot", "Java", "AWS(EC2, RDS), Docker"],
    github: {
      url: "https://github.com/PROMLEE/prototyne-frontend",
      label: "소스코드 보기",
    },
    desc: [
      "유저는 시제품을 체험하고, 기업은 피드백과 마케팅 데이터를 얻는 플랫폼",
      "6주간 백엔드 팀장으로 아키텍처 설계, 코드리뷰, CI/CD, 이슈 관리 총괄",
      "QueryDSL·Redis로 성능 30~75% 개선, Docker로 일관된 배포 환경 구축",
      "20개+ RESTful API, 카카오 OAuth2/JWT로 인증·권한 분리",
      "UMC 데모데이 출품, 약 60명 사용자 유치",
    ],
    teamSize: "9명 (백엔드 4명, 프론트엔드 4명, PM 1명)",
    role: "백엔드 팀장",
  },
];

// React.memo로 래핑하여 불필요한 리렌더링 방지
interface Project {
  name: string;
  period: string;
  iconUrl?: string;
  tech: string[];
  link?: { url: string; label: string };
  github?: { url: string; label: string };
  detailPage?: { url: string; label: string };
  featured?: boolean;
  desc: string[];
  teamSize: string;
  role: string;
}

const ProjectCard = memo(
  ({ project, idx }: { project: Project; idx: number }) => (
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
              // width={96}
              // height={96}
              // className="h-24 w-24 rounded-xl shadow-sm"
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
            {project.tech.map((tech: string, i: number) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-200"
              >
                {techIcons[tech] && (
                  <span className="mr-1">{techIcons[tech]}</span>
                )}
                {tech}
              </span>
            ))}
          </div>

          <ul className="mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {project.desc.map((text: string, i: number) => (
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
                <FaLink className="text-xs" /> {project.link.label}
              </a>
            )}
            {project.github && (
              <a
                href={project.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <FaGithub className="text-xs" /> {project.github.label}
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
  ),
);

ProjectCard.displayName = "ProjectCard";

// React.memo로 컴포넌트 전체를 감싸 불필요한 리렌더링 방지
export default memo(function TeamProjects() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
        <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          팀 프로젝트
        </span>
      </h1>
      <div className="space-y-10">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} idx={idx} />
        ))}
      </div>
    </div>
  );
});
