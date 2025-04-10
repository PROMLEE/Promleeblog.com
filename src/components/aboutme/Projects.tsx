import Image from "next/image";
import { useRef, useState } from "react";
import { useIsVisible } from "@/lib/useIsVisible";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

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
}

export const Projects = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const title = useIsVisible(ref);
  const p2 = useIsVisible(ref2);
  const p3 = useIsVisible(ref3);
  const p5 = useIsVisible(ref5);
  const [hover2, setHover2] = useState<boolean>(false);
  const [hover3, setHover3] = useState<boolean>(false);
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
      detail: "/blog/programming/build-blog",
      id: "promleeblog",
      hover: hover5,
      sethover: setHover5,
    },
    {
      name: "Map: 2 Zero",
      url: "https://github.com/PROMLEE/map2zero-frontend",
      thumbnail: {
        url: "https://github.com/PROMLEE/map2zero-frontend/raw/main/image/logo.png",
        width: 100,
        height: 100,
      },
      date: "2024.01.05 ~ 2024.02.25",
      contents: [
        "지속가능한 소비를 위한 제로 웨이스트 매장 정보 제공 서비스 제작 Team Project",
        "지속가능한 삶을 위한 ESG 서비스 Map:Zero(맵투제로)",
        "현재 위치를 기반으로, 소비자에게 제로 웨이스트 매장 추천 및 정보를 제공하고, 점주는 매장의 정보를 관리할 수 있는 서비스",
        "Neordinary Demoday 출품 및 실 사용자 100여명 유치",
      ],
      myrole: [
        "네이버 지도 연결 및 매장 데이터 연동",
        "소셜 로그인 구현",
        "매장의 정보 열람 및 리뷰 작성 페이지 제작",
        "점주의 매장 제품 등록 및 관리 폼 제작",
      ],
      mystack: ["React", "AWS S3, CloudFront", "Naver Map API"],
      ref: ref3,
      isVisible: p3,
      detail: "/aboutme/map2zero",
      id: "map2-zero",
      hover: hover3,
      sethover: setHover3,
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
    // {
    //   name: "Wear_os Watchface",
    //   url: "https://github.com/PROMLEE/Wear_Os_WatchFace",
    //   date: "2022.05 ~ 2022.12",
    //   thumbnail: {
    //     url: "https://cdn.promleeblog.com/etc/watchface/watchface-logo.png",
    //     width: 100,
    //     height: 100,
    //   },
    //   contents: [
    //     "Wear Os 기반의 안드로이드 웨어러블 기기의 배경화면 커스텀 제작 개인 프로젝트",
    //     "시계바늘, 배경화면, 기능을 커스텀하여 사용자가 원하는 시계 화면을 제작할 수 있도록 지원",
    //     "원하는 배경, 원하는 시계바늘, 워하는 기능 지원하는 컴플리케이션 8개 지원",
    //     "개인 용도로 사용중",
    //   ],
    //   myrole: [
    //     "시계 화면의 모양과 동작을 구성하는 XML 형식 파악",
    //     "androidx.wear.watchface 라이브러리 사용",
    //   ],
    //   mystack: ["Kotlin", "Android Studio", "Wear Os"],
    //   ref: ref1,
    //   isVisible: p1,
    //   id: "wear_os-watchface",
    //   detail:
    //     "https://github.com/PROMLEE/Wear_Os_WatchFace/blob/master/%EC%9B%8C%EC%B9%98%ED%8E%98%EC%9D%B4%EC%8A%A4%20%EA%B0%9C%EB%B0%9C.pdf",
    //   hover: hover1,
    //   sethover: setHover1,
    // },
    // {
    //   name: "이슈역",
    //   url: "https://github.com/PROMLEE/Issue-Station",
    //   thumbnail: {
    //     url: "https://cdn.promleeblog.com/etc/issue-station/issue-station-logo.png",
    //     width: 100,
    //     height: 30,
    //   },
    //   date: "2024.05.01 ~ 2024.06.10",
    //   contents: [
    //     "프로젝트의 이슈를 등록하고, 이슈에 대한 댓글을 작성하며, 이슈의 상태를 변경할 수 있는 서비스 제작 Team Project",
    //     "유저마다 허용된 권한에 따라 이슈를 등록하고, 이슈에 대한 댓글을 작성할 수 있으며, 이슈의 상태를 변경할 수 있는 서비스",
    //   ],
    //   myrole: [
    //     "React 기반 서비스 웹페이지 제작",
    //     "AWS S3 정적 페이지 호스팅",
    //     "Spring Boot 기반 서버 API 제작(Project Management Part)",
    //     "AWS EC2 서버 배포 및 관리",
    //   ],
    //   mystack: ["React", "Spring Boot", "MySQL", "AWS S3, EC2, RDS"],
    //   ref: ref4,
    //   isVisible: p4,
    //   detail:
    //     "https://github.com/PROMLEE/Issue-Station/blob/main/Issue-Station%20Document.pdf",
    //   id: "이슈역",
    //   hover: hover4,
    //   sethover: setHover4,
    // },
  ];
  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-100 opacity-20 dark:bg-blue-900"></div>
        <div
          ref={ref}
          className={`w-full duration-1000 ease-in ${
            title ? "opacity-100" : "opacity-25"
          }`}
        >
          <h1
            id="contribute-to"
            className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white"
          >
            <span className="animate-pulse">💻</span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Contribute to
            </span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>
        <div className="mt-8 flex flex-col gap-12">
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                ref={project.ref}
                className={`group relative w-full overflow-hidden rounded-lg bg-white/50 p-6 transition-all duration-500 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 ${
                  project.isVisible
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-25"
                }`}
                onMouseEnter={() => project.sethover && project.sethover(true)}
                onMouseLeave={() => project.sethover && project.sethover(false)}
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-100/50 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-blue-900/30"></div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2
                      id={project.id}
                      className="text-2xl font-bold text-gray-800 dark:text-white"
                    >
                      {project.name}
                    </h2>
                    {project.detail && (
                      <div
                        className={`relative flex h-8 transform items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 hover:scale-105 ${
                          project.hover || isMobile ? "w-32" : "w-12"
                        }`}
                      >
                        <Link
                          href={project.detail}
                          className="flex h-full w-full items-center justify-center px-3 text-sm text-white no-underline transition-all duration-300 hover:bg-white/10"
                        >
                          {project.hover || isMobile ? "View Detail" : "→"}
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="w-full space-y-4 md:w-2/3">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 transition-all duration-300 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <img
                          src="https://github.com/fluidicon.png"
                          alt="git"
                          className="mt-0 mb-0 h-5 w-5 transform rounded-sm transition-all duration-300 group-hover:scale-110"
                        />
                        <span className="transition-all duration-300 group-hover:translate-x-1">
                          {project.name} ↗
                        </span>
                      </a>
                      <div className="text-gray-600 dark:text-gray-400">
                        {project.date}
                      </div>
                      {project.thumbnail && (
                        <div className="relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]">
                          <Image
                            src={project.thumbnail.url}
                            alt={project.name}
                            width={project.thumbnail.width}
                            height={project.thumbnail.height}
                            className="m-0"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        {project.contents.map((content, idx) => (
                          <p
                            key={idx}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {content}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="w-full space-y-6 md:w-2/3">
                      <div>
                        <h3 className="mb-2 font-bold text-gray-800 dark:text-white">
                          My Role
                        </h3>
                        <ul className="m-0 space-y-2">
                          {project.myrole.map((role, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-gray-700 transition-all duration-300 hover:translate-x-2 dark:text-gray-300"
                            >
                              <span className="text-blue-500">▹</span>
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-2 font-bold text-gray-800 dark:text-white">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.mystack.map((stack, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition-all duration-300 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50"
                            >
                              {stack}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
