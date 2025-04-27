import React from "react";

export const Page4 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      주요 역할 ②
    </h1>
    <div className="rounded-2xl border bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold">매장 정보/리뷰 페이지 구현</h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>스와이프 이벤트로 매장 주요 이미지 확인</li>
        <li>리뷰 작성, 수정, 삭제 기능</li>
        <li>리뷰 열람 시 페이지네이션 제공</li>
      </ul>
      <h2 className="mb-4 text-xl font-bold">
        점주 매장 정보 관리 페이지 구현
      </h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>매장 판매 제품/이벤트 등록, 수정, 삭제</li>
        <li>Naver map api로 위치 등록 기능</li>
      </ul>
      <h2 className="mb-4 text-xl font-bold">
        S3, Cloudfront 정적 배포 & CI/CD
      </h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>Route53+Cloudfront로 커스텀 도메인 배포</li>
        <li>Github Actions로 S3 자동 배포 파이프라인 구축</li>
      </ul>
      <a
        href="https://github.com/PROMLEE/map2zero-frontend"
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        관련 코드 보기
      </a>
    </div>
  </div>
);
