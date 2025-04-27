import { FaLink, FaGooglePlay, FaApple } from "react-icons/fa";

const highlight = (text: string) => {
  // 수치/강조 키워드 정규식
  const regex =
    /(\d+\.?\d*%|\d+ms|\d+초|\d+명|\d+점|개선|최적화|런칭|유치|출품|성공|도입|도전|신규|성과|효율|안정성|성능|실사용자|데모데이|출시|런칭|도입|최초|기록|달성)/g;
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
    name: "사슬 (블록체인 코어 개발)",
    period: "2024.10.01 ~ 2024.12.20",
    iconUrl: "https://cdn.promleeblog.com/etc/logo/saseul.png",
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
    iconUrl: "https://cdn.promleeblog.com/etc/logo/proton.png",
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
    iconUrl: "https://cdn.promleeblog.com/etc/logo/jjiggomoney.png",
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
    iconUrl: "https://cdn.promleeblog.com/etc/logo/memeslot.png",
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

export default function ProjectsPT() {
  return (
    <section className="flex w-full flex-col items-center py-10">
      <h2 className="animate-fadein mb-10 text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-gray-100">
        대표 프로젝트
      </h2>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
        {projects.map((p, idx) => (
          <div
            key={p.name}
            className="group animate-fadein2 flex flex-col gap-4 rounded-2xl bg-white/80 p-8 shadow-xl transition-transform hover:scale-105 dark:bg-gray-900/80"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            <div className="mb-2 flex flex-col gap-3">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {p.name}
              </h3>
              {p.name === "찍고머니 (리워드 앱)" && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 whitespace-nowrap text-green-600 hover:text-pink-500"
                >
                  <FaGooglePlay />
                  <span className="text-sm underline">
                    플레이스토어에서 보기
                  </span>
                </a>
              )}
              {p.name !== "찍고머니 (리워드 앱)" && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 whitespace-nowrap text-blue-500 hover:text-pink-500"
                >
                  <FaLink />
                  <span className="text-sm underline">서비스 바로가기</span>
                </a>
              )}
              {p.apple && (
                <a
                  href={p.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 whitespace-nowrap text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-500"
                >
                  <FaApple />
                  <span className="text-sm underline">앱스토어에서 보기</span>
                </a>
              )}
              {p.sublink && (
                <a
                  href={p.sublink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 whitespace-nowrap text-blue-400 hover:text-pink-500"
                >
                  <FaLink />
                  <span className="text-sm underline">서브 서비스</span>
                </a>
              )}
              {p.portfolio && (
                <a
                  href={p.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 whitespace-nowrap text-blue-400 hover:text-pink-500"
                >
                  <FaLink />
                  <span className="text-sm underline">포트폴리오</span>
                </a>
              )}
            </div>
            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {p.period}
            </div>
            <div className="mb-2 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                >
                  {t}
                </span>
              ))}
            </div>
            <ul className="ml-5 list-disc space-y-1 text-base text-gray-700 dark:text-gray-200">
              {p.desc.map((d, i) => (
                <li key={i}>{highlight(d)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
