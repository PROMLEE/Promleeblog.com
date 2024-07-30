import React from "react";
import Image from "next/image";

export const Page7 = () => {
  return (
    <div className="flex w-full flex-col">
      <h1>5. 결과 및 느낀 점</h1>
      <div className="flex gap-5">
        <div className="flex-[0.8]">
          <h2>팀장으로써..</h2>
          <div>코드 컨벤션 관리, 일정 관리, 소통 등을 주도</div>
          <ul>
            <li>
              개발 규모는 꽤 컸지만 출품까지 개발 기간이 두 달 정도밖에 되지
              않았고 디자인 속도 부진 등의 문제가 생겼지만 정교한 역할 분배와
              지속적인 소통으로 잘 마무리했음
            </li>
            <li>
              데모 출품을 하며 자체 QA에서 발견하지 못한 기능적 문제점도
              발견하였고 반응형을 목표로 했지만 모든 기기에 대응하지 못했던
              부분도 찾았음
            </li>
            <li>
              소규모 프로젝트의 한계라고 생각하고 다음 기회에는 어떻게 대응해야
              할지 생각하게 된 소중한 경험
            </li>
          </ul>
          <h2>개발자로써..</h2>
          <div>프론트엔드 개발자로서의 성장</div>
          <ul>
            <li>React, Typescript 를 이용하여 규모 있는 첫 프로젝트를 진행</li>
            <li>
              QA 과정에서 예상치 못한 사용자들의 행동을 발견하고 이에 대응하는
              법을 배움
            </li>
            <li>
              유지 보수를 위한 코딩 방법, 컴포넌트 구조 등을 고민하게 되었음
            </li>
          </ul>
        </div>
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/13.png"
          alt="logo"
          width={300}
          height={50}
          className="flex-[0.2] rounded-lg"
        />
      </div>
    </div>
  );
};
