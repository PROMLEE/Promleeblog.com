import React from "react";
import Image from "next/image";

export const Page7 = () => (
  <div className="mx-auto w-full max-w-3xl">
    <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-700 dark:text-blue-400">
      프로젝트 회고
    </h1>
    <div className="rounded-2xl border bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold">팀장 경험</h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>코드 컨벤션 관리, 일정 관리, 소통 등 주도</li>
        <li>
          짧은 개발 기간(2달)과 디자인 속도 부진 등 문제를 정교한 역할 분배와
          소통으로 극복
        </li>
        <li>
          데모 출품 과정에서 QA에서 발견하지 못한 기능적 문제점, 반응형 미흡 등
          실전 경험
        </li>
        <li>
          소규모 프로젝트의 한계를 체감, 다음 기회에 더 나은 대응을 고민하게 됨
        </li>
      </ul>
      <h2 className="mb-4 text-xl font-bold">개발자 성장</h2>
      <ul className="mb-4 list-disc pl-5 text-base">
        <li>React, Typescript로 규모 있는 첫 프로젝트 진행</li>
        <li>QA 과정에서 예상치 못한 사용자 행동에 대응하는 법을 배움</li>
        <li>유지 보수를 위한 코딩 방법, 컴포넌트 구조 고민</li>
      </ul>
      <div className="mt-6 flex justify-center">
        <Image
          src="https://cdn.promleeblog.com/etc/map2zero/13.png"
          alt="프로젝트 회고"
          width={240}
          height={100}
          className="rounded-xl"
        />
      </div>
    </div>
  </div>
);
