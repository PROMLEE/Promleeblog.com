import { memo } from "react";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import OptimizedImage from "@/components/common/OptimizedImage";

// UMC 활동 성과 데이터
const umc = {
  period: "2023.09 ~ 현재",
  desc: [
    "웹/서버 파트 리더로 15명 이상의 스터디원에게 React/Spring 개발 지식 전달",
    "서버 파트 수료 및 우수 활동자 선정",
    "Map2Zero 제로웨이스트 매장 검색 서비스 개발 프로젝트 팀장",
    "웹 개발, 팀 협업, 기획 역량 증진",
  ],
  link: "/aboutme/map2zero",
};

// KeyAchievements 컴포넌트를 memo로 감싸 불필요한 리렌더링 방지
const KeyAchievements = memo(() => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">
        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          주요 활동 & 성과
        </span>
      </h1>

      {/* UMC 활동 */}
      <div className="mb-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <OptimizedImage
            src="https://cdn.promleeblog.com/etc/logo/umc-logo.png"
            alt="UMC 로고"
            width={120}
            height={120}
            className="rounded-xl border border-gray-200 shadow-md dark:border-gray-700"
          />
        </div>
        <div className="flex-grow">
          <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              UMC (대학 연합 IT 동아리)
            </h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              {umc.period}
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-green-700 dark:from-gray-800 dark:to-gray-800">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-500 to-emerald-500"></div>
        <div className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-green-200 opacity-20 dark:bg-green-700"></div>

        <h3 className="mb-4 text-xl font-bold text-green-700 dark:text-green-400">
          UMC 주요 활동 및 성과
        </h3>

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
                  </span>{" "}
                  프로젝트 런칭
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

      {/* 블록웨이브랩스 */}
      <div className="relative mt-8 overflow-hidden rounded-xl border-2 border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-purple-700 dark:from-gray-800 dark:to-gray-800">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
        <div className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-purple-200 opacity-20 dark:bg-purple-700"></div>

        <h3 className="mb-4 text-xl font-bold text-purple-700 dark:text-purple-400">
          블록웨이브랩스
        </h3>

        <div className="ml-2 space-y-3 pl-2">
          <p className="flex items-start text-base text-gray-700 dark:text-gray-300">
            <span className="mt-1 mr-2 text-purple-500">•</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">
              블록체인 기반 NFT 플랫폼
            </span>{" "}
            개발 프로젝트 참여
          </p>
          <p className="flex items-start text-base text-gray-700 dark:text-gray-300">
            <span className="mt-1 mr-2 text-purple-500">•</span>
            웹 프론트엔드 개발자로 NFT 마켓플레이스 UI 개발
          </p>
          <p className="flex items-start text-base text-gray-700 dark:text-gray-300">
            <span className="mt-1 mr-2 text-purple-500">•</span>
            React, Next.js, TypeScript, Web3.js 기술 스택 활용
          </p>
          <p className="flex items-start text-base text-gray-700 dark:text-gray-300">
            <span className="mt-1 mr-2 text-purple-500">•</span>
            블록체인 지갑 연동 및 NFT 구매/판매 기능 구현
          </p>
        </div>

        <Link
          href="https://blockwavelabs.io"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          <FaLink /> 블록웨이브랩스 홈페이지
        </Link>
      </div>
    </div>
  );
});

KeyAchievements.displayName = "KeyAchievements";
export default KeyAchievements;
