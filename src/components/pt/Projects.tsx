import { memo } from "react";
import { FaLink, FaApple } from "react-icons/fa";

const highlight = (text: string) => {
  // 수치/강조 키워드 정규식
  const regex =
    /(\d+\.?\d*%|\d+ms|\d+초|\d+명|\d+점|개선|최적화|런칭|유치|출품|성공|도입|도전|신규|성과|효율|안정성|성능|실사용자|데모데이|출시|런칭|도입|최초|기록|달성)/g;
  let count = 0;
  return text.split(regex).map((part, i) => {
    if (i % 2 === 1 && count < 2) {
      count++;
      return (
        <span key={i} className="font-bold text-blue-600 dark:text-blue-400">
          {part}
        </span>
      );
    }
    return part;
  });
};

const projects = [
  {
    name: "사슬 (블록체인 코어 개발)",
    period: "2024.10.01 ~ 2024.12.20",
    iconUrl: "https://cdn.promleeblog.com/etc/logo-new/saseul.png",
    tech: ["Golang", "Docker", "Mysql", "AWS EC2", "PHP"],
    link: "https://saseul.com",
    desc: [
      "블록체인 네트워크 '사슬'의 동작 코어 개발 참여 (Core 개발 및 설계 3, PM 1)",
      "PHP 환경을 Golang으로 마이그레이션, 기존 네트워크의 취약점 파악",
      "goroutine을 활용한 노드간 데이터 동기화 속도 30% 개선, 처리 효율 및 안정성 향상",
      "ForceSync 병목 해소, 테스트넷 환경 구축 및 운영, 시스템 신뢰성 확보",
      "시스템 안정화와 데이터 처리 성능 향상으로 블록체인 서비스 운영 효율성 증대",
    ],
  },
  {
    name: "프로톤 (토큰 스테이킹 서비스)",
    period: "2024.10.01 ~ 2024.11.15",
    iconUrl: "https://cdn.promleeblog.com/etc/logo-new/proton.png",
    tech: ["Rust", "wasm", "typescript"],
    link: "https://www.proton.cool/",
    desc: [
      "Neutron 체인 기반 Web3 스테이킹 서비스 개발 (Smart Contract 1, PM 1, FE 1, BE 1, Design 1)",
      "Rust 및 CosmWasm 기반 스마트 컨트랙트 개발 및 테스트",
      "qNeutron 토큰 발행, CW20 표준 토큰 로직 설계, 스테이킹/언스테이킹 로직 구현",
      "TVL 자동 수집 및 검증 스크립트(ts) 작성, 운영 데이터 관리 효율성 확보",
      "Rust, CosmWasm, 블록체인 실무 경험을 통한 시스템 설계 역량 강화",
    ],
  },
  {
    name: "찍고머니 (리워드 앱)",
    period: "2024.12.01 ~ 2025.2.28",
    iconUrl: "https://cdn.promleeblog.com/etc/logo-new/jjiggomoney.png",
    tech: ["Flutter", "Next.js", "firebase"],
    link: "https://play.google.com/store/apps/details?id=com.jeff.lite",
    apple:
      "https://apps.apple.com/kr/app/찍고머니-사진만-찍으면-보상이-쌓이는-리워드-앱/id6740126637",
    desc: [
      "Flutter 앱, Nextjs 어드민 페이지 전담 프론트엔드 개발 (FE 1, PM 1, BE 1, Design 1)",
      "화면 라이프사이클 관리, 서버 부하 최소화 등 핵심 화면 개발",
      "Riverpod+GetX 하이브리드 상태관리, Retrofit+Dio 타입 안정성/에러 처리 일관성",
      "MVVM 패턴, 토큰 갱신 중복 요청 방지(60% 감소)",
      "앱 소개/약관 SSG pre-render, Firebase Analytics/Push, 소셜 로그인, 지도, Admob, 다국어 지원",
    ],
    portfolio: "https://www.promleeblog.com/download/jjiggo.pdf",
  },
  {
    name: "밈슬롯 (토큰 런치패드)",
    period: "2024.8.26 ~ 2024.10.1",
    iconUrl: "https://cdn.promleeblog.com/etc/logo-new/memeslot.png",
    tech: ["Next.js", "tailwindcss"],
    link: "https://www.memeslot.me/",
    sublink: "https://www.kaiseki.fun/",
    desc: [
      "블록체인 입문자용 토큰 생성 런치패드 프론트엔드 개발 (FE 1, PM 1, BE 1, Design 1, Smart Contract 1)",
      "반응형 전환, api 병렬화로 초기 로드 2.5초→1초",
      "트레이딩뷰 차트 최적화, 데이터 업데이트 주기 관리",
      "웹소켓 전환으로 실시간성/서버부하 개선(지연 5초→100ms, 부하 70%↓)",
    ],
  },
];

const ProjectCard = memo(({ project }: { project: (typeof projects)[0] }) => (
  <div className="relative rounded-xl border bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/50">
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      {project.iconUrl && (
        <div className="flex items-center justify-center md:w-1/6">
          <img
            src={project.iconUrl}
            alt={project.name}
            width={96}
            className="w-24 shadow-sm"
          />
        </div>
      )}
      <div className="flex-1">
        <div className="mb-2 flex flex-wrap justify-between gap-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {project.period}
          </span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((tech: string, i: number) => (
            <span
              key={i}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <ul className="mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {project.desc.map((text: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="mt-1 mr-2 text-blue-500">•</span>
              <span>{highlight(text)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              <FaLink className="text-xs" /> 서비스 바로가기
            </a>
          )}
          {project.apple && (
            <a
              href={project.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <FaApple className="text-xs" /> 앱스토어에서 보기
            </a>
          )}
          {project.sublink && (
            <a
              href={project.sublink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              <FaLink className="text-xs" /> 서브 서비스
            </a>
          )}
          {project.portfolio && (
            <a
              href={project.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              <FaLink className="text-xs" /> 포트폴리오
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
));

ProjectCard.displayName = "ProjectCard";

export default function ProjectsPT() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h2 className="mb-10 text-center text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-gray-100">
        실무 프로젝트
      </h2>
      <div className="space-y-10">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
}
