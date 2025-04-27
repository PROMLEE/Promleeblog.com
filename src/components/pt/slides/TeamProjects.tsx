import { JSX } from "react";
import { FaLink, FaGithub } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiReact, SiAmazon } from "react-icons/si";

const techIcons: Record<string, JSX.Element> = {
  "Spring Boot": <SiSpringboot size={22} color="#6DB33F" />,
  MySQL: <SiMysql size={22} color="#00758F" />,
  React: <SiReact size={22} color="#61DAFB" />,
  "AWS(EC2)": <SiAmazon size={22} color="#FF9900" />,
};

const highlight = (text: string) => {
  const regex =
    /(\d+\.?\d*%|\d+ms|\d+초|\d+명|\d+점|개선|최적화|런칭|유치|출품|성공|도입|도전|신규|성과|효율|안정성|성능|실사용자|데모데이|출시|최초|기록|달성|팀장)/g;
  let count = 0;
  return text.split(regex).map((part, i) => {
    if (i % 2 === 1 && count < 2) {
      count++;
      return (
        <span key={i} className="font-bold text-white">
          {part}
        </span>
      );
    }
    return part;
  });
};

const projects = [
  {
    name: "Map: 2 Zero (제로 웨이스트 매장 정보 제공 서비스)",
    period: "2024.01.05 ~ 2024.02.25",
    iconUrl: "",
    tech: ["React"],
    github: {
      url: "https://github.com/PROMLEE/map2zero-frontend",
      label: "소스코드 보기",
    },
    link: {
      url: "https://www.promleeblog.com/aboutme/map2zero",
      label: "상세보기",
    },
    desc: [
      "제로 웨이스트 샵 정보 플랫폼, 프론트엔드 팀장 (FE 4, BE 4, PM 1, Design 1)",
      "git-workflow/코드리뷰/팀 소통 주도, React 컴포넌트 모듈화, TypeScript로 타입 안정성 확보",
      "50개+ 매장 데이터 시각화, 위치 기반 추천, 서울시 스마트서울맵 API 연동",
      "비동기 예외처리로 위치 탐색 오류 제거, UMC 데모데이 출품, 100명+ 사용자 유치",
    ],
  },
  {
    name: "PROTOTYNE (시제품 체험 플랫폼)",
    period: "2024.09.01 ~ 2024.12.15",
    iconUrl: "",
    tech: ["Spring Boot", "MySQL", "React", "AWS(EC2)"],
    github: {
      url: "https://github.com/PROMLEE/PROTOTYNE_BE",
      label: "소스코드 보기",
    },
    desc: [
      "유저와 기업 모두 윈-윈하는 시제품 체험 플랫폼 개발 (BE 4, FE 4, PM 1)",
      "백엔드 팀장, 전체 아키텍처 설계/코드리뷰/CI/CD/이슈 관리 총괄",
      // "QueryDSL로 쿼리 30% 단축, Redis 캐싱으로 응답 200ms→50ms, Docker로 컨테이너 크기 70% 축소",
      "EC2/S3/Route53로 실서비스 배포, Github Actions+Docker로 자동화된 CI/CD 구축",
      "카카오 소셜 로그인, 20개+ 핵심 API, JWT 권한 분리, RESTful 설계, Notion 문서화",
      "UMC 데모데이 출품, 60명 사용자 유치",
    ],
  },
  {
    name: "이슈역 (이슈 관리 서비스)",
    period: "2024.05.01 ~ 2024.06.10",
    iconUrl: "",
    tech: ["Spring Boot", "MySQL", "React", "AWS(EC2)"],
    github: {
      url: "https://github.com/PROMLEE/Issue-Station",
      label: "소스코드 보기",
    },
    desc: [
      "소프트웨어 공학적 설계 기반 이슈 관리 서비스 (FE+BE 1, FE 1, BE 2, Docs 1)",
      "역할별 권한 분리, 이슈 등록/댓글/상태변경/조회 등 협업 핵심 기능 제공",
      "설계-문서화-검증 전 과정 주도, 유스케이스/도메인모델/API스펙 직접 작성",
      "Web UI+GUI 클라이언트 이중화, RESTful 설계로 멀티 인터페이스 구조 검증",
      "구조적 사고와 설계 역량 강화 경험",
    ],
  },
];

export default function TeamProjectsSlide() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-10 select-none">
      <h2 className="animate-fadein mb-4 text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-gray-100">
        팀 프로젝트
      </h2>
      <div className="animate-fadein2 flex w-full max-w-7xl flex-col gap-10">
        {projects.map((p, idx) => (
          <div
            key={p.name}
            className="flex min-h-[320px] w-full flex-col gap-8 rounded-2xl bg-white/80 p-10 shadow-2xl transition-transform hover:scale-[1.02] md:flex-row dark:bg-gray-900/80"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            {/* 좌측: 프로젝트 정보 */}
            <div className="flex max-w-[420px] min-w-[320px] flex-1 flex-col justify-between gap-4">
              <div className="mb-2 flex items-center gap-3">
                {p.iconUrl && (
                  <img
                    src={p.iconUrl}
                    alt="project icon"
                    className="mr-2 h-10 w-10 rounded-lg object-cover"
                  />
                )}
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {p.name}
                </span>
              </div>
              <div className="mb-1 text-base text-gray-500 dark:text-gray-400">
                {p.period}
              </div>
              <div className="mb-2 flex flex-wrap gap-3">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 rounded-full bg-blue-100 px-4 py-2 text-base font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {techIcons[t] ?? null}
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {p.link && (
                  <a
                    href={p.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-pink-500 dark:text-blue-400 dark:hover:text-pink-500"
                  >
                    <FaLink />
                    <span className="text-sm whitespace-nowrap underline">
                      {p.link.label}
                    </span>
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-500"
                  >
                    <FaGithub />
                    <span className="text-sm whitespace-nowrap underline">
                      {p.github.label}
                    </span>
                  </a>
                )}
              </div>
            </div>
            {/* 우측: 설명 */}
            <div className="flex flex-[2] flex-col justify-center">
              <ul className="ml-6 list-disc space-y-2 text-lg break-keep whitespace-pre-line text-gray-700 dark:text-gray-200">
                {p.desc.map((d, i) => (
                  <li key={i}>{highlight(d)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
