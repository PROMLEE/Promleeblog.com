import { FaMedal, FaUsers, FaBuilding } from "react-icons/fa";

const achievements = [
  "Typescript, Java 기반의 Full Stack 개발 경험",
  "Next.js 기반 풀스택 블로그 제작 및 SEO/반응형 최적화",
  "딥러닝 기반 실내 길찾기 앱 졸업 프로젝트 수행",
  "블록체인 스타트업 (주)블록웨이브랩스 인턴, Web3 프로덕트 4개 이상 개발",
  "언어와 프레임워크를 가리지 않고 사용자 경험을 최우선하는 도전적 개발자",
];

const umc = {
  title: "UMC 대학생 IT 연합 동아리",
  desc: [
    "5기, 6기 웹 파트장, 서버 파트원 (2023.09 ~ 2024.08)",
    "제로 웨이스트 매장 서비스 Map2Zero, 프로토타입 체험 플랫폼 PROTOTYNE 런칭",
    "두 번의 서비스 런칭 모두 프론트엔드 팀장, 서버 파트 팀장으로 개발 주도",
    "Neodinary Demoday 출품, 실 사용자 100명 유치",
  ],
};

const blockwave = {
  title: "(주)블록웨이브랩스 인턴",
  desc: [
    "프로덕트팀 FE/Blockchain (2024.09 ~)",
    "WEB3 기반 프로덕트 개발, 블록체인 코어 네트워크(GoLang), 스마트 컨트랙트(Rust) 등 다양한 실무 경험",
    "밈코인 런치패드(Next.js), NFT 생성 앱(Flutter, Next.js), 블록체인 지갑/결제 앱(React Native) 등 프론트엔드 담당",
  ],
};

export default function KeyAchievementsSlide() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-10 select-none">
      <h2 className="animate-fadein mb-8 text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-gray-100">
        핵심 성과
      </h2>
      <ul className="animate-fadein2 mb-6 flex flex-col gap-3 text-lg text-gray-800 dark:text-gray-100">
        {achievements.map((a, i) => (
          <li key={i} className="flex items-center gap-2">
            <FaMedal color="#f59e42" /> {a}
          </li>
        ))}
      </ul>
      <div className="flex w-full max-w-6xl flex-col gap-8">
        {/* UMC 카드 */}
        <div className="animate-fadein2 flex flex-col gap-3 rounded-2xl bg-white/80 p-8 shadow-xl dark:bg-gray-900/80">
          <div className="mb-2 flex items-center gap-2">
            <FaUsers className="text-2xl text-pink-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {umc.title}
            </span>
          </div>
          <ul className="ml-6 list-disc space-y-1 text-base text-gray-700 dark:text-gray-200">
            {umc.desc.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        {/* Blockwave 카드 */}
        <div className="animate-fadein2 flex flex-col gap-3 rounded-2xl bg-white/80 p-8 shadow-xl dark:bg-gray-900/80">
          <div className="mb-2 flex items-center gap-2">
            <FaBuilding className="text-2xl text-blue-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {blockwave.title}
            </span>
          </div>
          <ul className="ml-6 list-disc space-y-1 text-base text-gray-700 dark:text-gray-200">
            {blockwave.desc.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
