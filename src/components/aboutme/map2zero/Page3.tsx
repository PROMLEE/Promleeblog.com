import React from "react";
import Image from "next/image";

const Page3 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      주요 역할 ①
    </h1>
    <div className="rounded-2xl border bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold">Kakao 로그인 구현</h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>Rest API 방식의 Kakao Oauth 로그인 구현</li>
        <li>가짜 토큰 발급 → accessToken과 함께 서버로 전송(CSRF 방지)</li>
        <li>서버에서 받은 토큰을 localStorage에 저장, 로그인 처리</li>
      </ul>
      <h2 className="mb-4 text-xl font-bold">Naver map 활용 데이터 표시</h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>현재 위치 권한을 받아 가까운 매장 표시</li>
        <li>화면에 보이는 매장만 마커로 표시, 최적화</li>
        <li>줌/드래그/클릭 등 다양한 이벤트로 매장 정보 확인</li>
      </ul>
      <a
        href="https://github.com/PROMLEE/map2zero-frontend"
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        관련 코드 보기
      </a>
      <div className="mt-6 flex justify-center">
        <Image
          src="https://cdn.promleeblog.com/etc/map2zero/2.png"
          alt="Kakao/Naver map"
          width={220}
          height={120}
          className="rounded-xl"
        />
      </div>
    </div>
  </div>
);

export default Page3;

