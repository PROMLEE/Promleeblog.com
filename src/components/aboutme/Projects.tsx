import { useRef, useState } from "react";
import { useIsVisible } from "@/lib/useIsVisible";
interface ProjectType {
  name: string;
  url: string;
  thumbnail?: { url: string; width: number; height: number };
  date: string;
  contents: string[];
  myrole: string[];
  mystack: string[];
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  id: string;
  detail?: string;
  hover: boolean;
  sethover: React.Dispatch<React.SetStateAction<boolean>>;
  featured?: boolean;
}

export const Projects = () => {
  const ref2 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const p2 = useIsVisible(ref2);
  const p5 = useIsVisible(ref5);
  const [hover2, setHover2] = useState<boolean>(false);
  const [hover5, setHover5] = useState<boolean>(false);

  const projects: ProjectType[] = [
    {
      name: "PromleeBlog",
      url: "https://github.com/PROMLEE/Promleeblog.com",
      date: "2024.04.20 ~",
      thumbnail: {
        url: "/icons/android-chrome-192x192.png",
        width: 100,
        height: 100,
      },
      contents: [
        "개인 블로그 제작",
        "Next.js 기반의 정적 블로그",
        "SEO 최적화를 통한 일일 검색 노출 평균 200회, CTR 4.3% 유지 중(2025.02.25 기준)",
      ],
      myrole: [
        "Next.js 기반 블로그 제작",
        "Tailwind CSS를 이용한 디자인",
        "다크 모드, 반응형 지원",
        "Supabase를 이용한 데이터베이스 연동",
        "SEO 최적화 및 SDN환경 구성을 통한 이미지 최적화",
      ],
      mystack: ["Next.js", "Supabase", "AWS S3, CloudFront", "Route53"],
      ref: ref5,
      isVisible: p5,
      detail: "/aboutme/promleeblog",
      id: "promleeblog",
      hover: hover5,
      sethover: setHover5,
      featured: true,
    },
    {
      name: "Indoor Map",
      url: "https://github.com/PROMLEE/Indoor_map",
      thumbnail: {
        url: "https://github.com/PROMLEE/Indoor_map/raw/main/Indoor_map_flutter/src/ic_launcher.png",
        width: 100,
        height: 100,
      },
      date: "2023.09.01 ~ 2023.12.15",
      contents: [
        "도면(안내도) 기반 image segmentation 기술을 이용한 실내 길 찾기 지원 플랫폼 제작 Team Project",
        "건물 소유주가 도면을 업로드 시, 자동화된 이미지 처리를 통해 도면 분석 및 길 찾기 서비스 제공",
        "건물 내부 세부 정보 및 편의 시설 정보 수정을 위한 관리자 페이지 제공",
      ],
      myrole: [
        "딥 러닝 모델 생성 및 이미지 처리",
        "Flask 기반 API 제작 및 배포",
        "React 기반 관리자 페이지 제작",
      ],
      mystack: ["Flutter", "Flask", "React", "OpenCV", "DeepLabV3+"],
      ref: ref2,
      isVisible: p2,
      id: "indoor-map",
      detail:
        "https://github.com/PROMLEE/Indoor_map/blob/main/Final_report_team7.pdf",
      hover: hover2,
      sethover: setHover2,
    },
  ];

  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-100 opacity-20 dark:bg-blue-900"></div>
        <h1
          id="projects"
          className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white"
        >
          <span className="animate-bounce">🚀</span>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <div className="mt-8 flex flex-col gap-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              ref={project.ref}
              onMouseEnter={() => project.sethover(true)}
              onMouseLeave={() => project.sethover(false)}
              className={`${
                project.isVisible ? "opacity-100" : "opacity-0"
              } group relative overflow-hidden rounded-xl border transition-all duration-700 ${
                project.featured
                  ? "border-blue-500 bg-white shadow-blue-100 dark:border-blue-600 dark:bg-gray-800 dark:shadow-blue-900/10"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              } p-6 shadow-lg`}
            >
              {project.featured && (
                <div className="absolute -top-3 -right-3 z-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 p-2 text-xs font-bold text-white shadow-lg">
                  Featured
                </div>
              )}
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {project.thumbnail && (
                  <div className="flex items-center justify-center md:w-1/4 md:max-w-[200px]">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 opacity-20 blur-lg transition-all duration-300 ${project.hover ? "scale-110" : "scale-100"}`}
                      ></div>
                      <img
                        src={project.thumbnail.url}
                        alt={project.name}
                        width={project.thumbnail.width}
                        height={project.thumbnail.height}
                        className="z-10 mt-0 mb-0 aspect-square rounded-xl object-cover shadow-md transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
                        >
                          {project.name}
                        </a>
                      </h2>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {project.date}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.mystack.map((stack, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      프로젝트 소개
                    </h3>
                    <ul className="m-0 list-none space-y-1">
                      {project.contents.map((content, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600 transition-all duration-300 hover:translate-x-1 dark:text-gray-400"
                        >
                          <span className="mr-2 text-blue-500">▹</span>
                          {content}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      담당 역할
                    </h3>
                    <ul className="m-0 list-none space-y-1">
                      {project.myrole.map((role, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600 transition-all duration-300 hover:translate-x-1 dark:text-gray-400"
                        >
                          <span className="mr-2 text-blue-500">▹</span>
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.detail && (
                    <div className="mt-4 flex justify-end">
                      <a
                        href={project.detail}
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 ${
                          project.featured
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                            : "bg-blue-600"
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                        {project.id === "promleeblog" &&
                          "블로그 프로젝트 상세보기"}
                        {!["promleeblog"].includes(project.id) && "상세 보기"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
