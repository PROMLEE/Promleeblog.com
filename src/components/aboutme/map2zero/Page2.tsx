import React from "react";
import Image from "next/image";

const Page2 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      팀 & 주요 성과
    </h1>
    <div className="mb-6 flex flex-col gap-8 rounded-2xl border bg-white p-6 shadow-lg md:flex-row dark:bg-gray-900">
      <Image
        src="https://cdn.promleeblog.com/etc/map2zero/2.png"
        alt="팀 협업 이미지"
        width={180}
        height={80}
        className="mb-4 rounded-xl border shadow md:mb-0"
      />
      <div className="flex-1">
        <h2 className="mb-2 text-2xl font-bold">팀 구성 및 협업 방식</h2>
        <ul className="mb-2 list-disc pl-5 text-base">
          <li>프론트엔드 2명, 백엔드 1명, 디자이너 1명으로 구성된 4인 팀</li>
          <li>Notion, Slack, Figma, GitHub를 활용한 온라인 협업</li>
          <li>주 2회 정기 회의 및 데일리 스탠드업으로 진행 상황 공유</li>
        </ul>
        <h2 className="mb-2 text-2xl font-bold">프로젝트 정보</h2>
        <ul className="mb-2 list-disc pl-5 text-base">
          <li>2023년 7월 ~ 2023년 9월 (총 10주)</li>
          <li>제로 웨이스트 샵 데이터 수집 및 사용자 리뷰 기능 개발</li>
          <li>GitHub Actions를 통한 CI/CD 자동화, AWS S3/Route53 배포</li>
        </ul>
        <h2 className="mb-2 text-2xl font-bold">문제 상황 & 해결 과정</h2>
        <ul className="mb-2 list-disc pl-5 text-base">
          <li>
            초기 데이터 수집 시, 매장 정보의 불일치 및 중복 문제 발생 → 크롤링
            로직 개선 및 수동 검수로 해결
          </li>
          <li>리뷰 악용(스팸) 방지를 위한 인증 로직 도입</li>
          <li>지도 API 사용량 초과 이슈 → 캐싱 및 API Key 관리 강화</li>
        </ul>
        <h2 className="mb-2 text-2xl font-bold">배운 점</h2>
        <ul className="mb-2 list-disc pl-5 text-base">
          <li>실제 사용자 피드백을 반영한 기능 개선의 중요성 체감</li>
          <li>
            팀 내 역할 분담과 적극적 소통이 프로젝트 완성도에 미치는 영향 경험
          </li>
        </ul>
        <a
          href="https://github.com/promlee/map2zero"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-600 underline hover:text-blue-800"
        >
          프로젝트 GitHub 바로가기
        </a>
      </div>
    </div>
  </div>
);

export default Page2;

