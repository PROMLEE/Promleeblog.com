import React from "react";
import Image from "next/image";

interface SkillType {
  name: string;
  bg: string;
  logo: string;
  logocolor: string;
}
const skills: SkillType[] = [
  { name: "React", bg: "20232A", logo: "react", logocolor: "61DAFB" },
  { name: "Typescript", bg: "05122A", logo: "typescript", logocolor: "white" },
  { name: "S3", bg: "569A31", logo: "amazons3", logocolor: "white" },
  { name: "ROUTE53", bg: "8C4FFF", logo: "amazonroute53", logocolor: "white" },
  {
    name: "GitHub Actions",
    bg: "2088FF",
    logo: "githubactions",
    logocolor: "white",
  },
];
const tools: SkillType[] = [
  { name: "Git", bg: "F05032", logo: "git", logocolor: "white" },
  { name: "Github", bg: "181717", logo: "github", logocolor: "white" },
  { name: "Slack", bg: "4A154B", logo: "slack", logocolor: "white" },
  { name: "Notion", bg: "000000", logo: "notion", logocolor: "white" },
  { name: "Figma", bg: "F24E1E", logo: "figma", logocolor: "white" },
];

const Page1 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      프로젝트 개요
    </h1>
    <div className="mb-6 flex flex-col items-center gap-8 rounded-2xl border bg-white p-6 shadow-lg md:flex-row dark:bg-gray-900">
      <Image
        src="https://cdn.promleeblog.com/etc/map2zero/1.png"
        alt="map2zero 로고"
        width={180}
        height={80}
        className="mb-4 rounded-xl border shadow md:mb-0"
      />
      <div className="flex-1">
        <h2 className="mb-2 text-2xl font-bold">Map2Zero</h2>
        <p className="mb-2 text-lg">
          <b>한줄소개:</b> Map2Zero는 서울 내 제로 웨이스트 샵의 위치, 리뷰,
          제품, 이벤트 정보를 한눈에 제공하는 지속가능한 라이프스타일
          플랫폼입니다.
        </p>
        <p className="mb-2 text-base">
          <b>서비스 목적:</b> 환경 보호와 지속가능한 소비를 실천하는 시민들이 더
          쉽게 제로 웨이스트 샵을 찾고, 실제 방문 후기를 공유하며, 친환경 소비
          문화를 확산시키는 데 기여합니다.
        </p>
        <p className="mb-2 text-base">
          <b>주요 기능:</b> 매장 위치 지도 기반 탐색, 리뷰/평점, 판매 제품 정보,
          매장별 이벤트/프로모션, 사용자 맞춤 추천, 실시간 알림 등 다양한 기능을
          제공합니다.
        </p>
        <p className="mb-2 text-base">
          <b>차별점:</b> 단순 매장 정보 제공을 넘어, 실제 사용자 경험 기반의
          리뷰와 커뮤니티, 친환경 소비 트렌드 콘텐츠, 매장주와의 직접 소통
          기능까지 지원합니다.
        </p>
        <p className="mb-2 text-base">
          <b>개발 동기:</b> 환경 문제에 대한 관심과, 제로 웨이스트 실천의
          어려움을 직접 경험하며, 더 많은 사람들이 쉽게 친환경 소비를 시작할 수
          있도록 돕고 싶었습니다.
        </p>
        <p className="mb-2 text-base">
          <b>기대효과:</b> 사용자들이 제로 웨이스트 샵을 더 자주 방문하고,
          친환경 소비가 일상화되는 데 기여. 매장주 입장에서도 신규 고객 유입과
          커뮤니티 활성화 효과 기대.
        </p>
      </div>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col items-start rounded-2xl border bg-white p-6 shadow-lg dark:bg-gray-900">
        <h3 className="mb-2 text-lg font-bold">기술 스택</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, idx) => (
            <img
              key={idx}
              src={`https://img.shields.io/badge/${s.name}-${s.bg}?style=for-the-badge&logo=${s.logo}&logoColor=${s.logocolor}`}
              alt={s.name}
              className="h-8 rounded-lg border"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start rounded-2xl border bg-white p-6 shadow-lg dark:bg-gray-900">
        <h3 className="mb-2 text-lg font-bold">협업 도구</h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((s, idx) => (
            <img
              key={idx}
              src={`https://img.shields.io/badge/${s.name}-${s.bg}?style=for-the-badge&logo=${s.logo}&logoColor=${s.logocolor}`}
              alt={s.name}
              className="h-8 rounded-lg border"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Page1;

