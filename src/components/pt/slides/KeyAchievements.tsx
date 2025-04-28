import { FaMedal, FaUsers, FaLink } from "react-icons/fa";
import Link from "next/link";

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
  link: "/aboutme/map2zero",
};

const KeyAchievements = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          주요 성과 & 활동
        </span>
      </h1>

      <div className="mb-10 rounded-xl border border-blue-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-blue-900 dark:bg-gray-800">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
          <FaMedal className="text-yellow-500" />
          <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            핵심 역량
          </span>
        </h2>
        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="relative rounded-lg bg-gray-50 p-3 pl-10 shadow-sm transition-transform duration-300 hover:translate-x-2 dark:bg-gray-700/50"
            >
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-2xl font-bold text-gray-800/20 dark:text-white/20">
                {idx + 1}
              </span>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-green-700 dark:from-gray-800 dark:to-gray-800">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-100 opacity-20 dark:bg-green-800"></div>
        <div className="absolute -top-6 -right-6 rotate-12 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
          핵심 경험
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
            <FaUsers size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {umc.title}
          </h2>
        </div>

        <div className="ml-2 space-y-3 pl-2">
          {umc.desc.map((line, idx) => (
            <p
              key={idx}
              className="flex items-start text-base text-gray-700 dark:text-gray-300"
            >
              <span className="mt-1 mr-2 text-green-500">•</span>
              {line.includes("Map2Zero") ? (
                <span>
                  제로 웨이스트 매장 서비스{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    Map2Zero
                  </span>
                  , 프로토타입 체험 플랫폼 PROTOTYNE 런칭
                </span>
              ) : (
                line
              )}
            </p>
          ))}
        </div>

        <Link
          href={umc.link}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          <FaLink /> Map2Zero 프로젝트 상세보기
        </Link>
      </div>
    </div>
  );
};

export default KeyAchievements;
