import React from "react";
import Image from "next/image";

export const Page4 = () => {
  return (
    <div className="flex w-full flex-col">
      <h1>4. My Role - 2</h1>
      <div className="flex flex-col">
        <h2>기타 주요 페이지 구현 및 배포</h2>
        <h4>
          <a href="https://github.com/PROMLEE/map2zero-frontend/blob/main/src/pages/Home.tsx">
            매장 정보와 리뷰를 확인할 수 있는 페이지 구현 🔗
          </a>
        </h4>
        <ol className="marker:text-white">
          <li>스와이프 이벤트로 매장의 주요 이미지를 확인 가능하도록 구현</li>
          <li>리뷰 작성, 수정, 삭제 기능을 구현</li>
          <li>
            매장 리뷰 열람 시{" "}
            <div className="text-underlined">페이지네이션</div> 제공
          </li>
        </ol>
        <h4>
          <a href="https://github.com/PROMLEE/map2zero-frontend/blob/main/src/pages/SellingProductManage.tsx">
            점주가 직접 매장 정보를 등록하고 수정할 수 있는 페이지 구현 🔗
          </a>
        </h4>
        <ol className="marker:text-white">
          <li>매장 판매 제품과 이벤트를 등록, 수정, 삭제 가능하도록 구현</li>
          <li>매장 정보 등록 시 Naver map api를 활용한 위치 등록 기능 구현</li>
        </ol>
        <h4>S3, Cloudfront를 이용한 정적 배포와 CI/CD 파이프라인 구축</h4>
        <ol className="marker:text-white">
          <li>커스텀 도메인을 활용하여 Route53등록 및 Cloudfront 배포</li>
          <li>
            Github Actions를 활용하여 배포 브랜치에서 S3로의 자동 Push 설정
          </li>
        </ol>
      </div>
    </div>
  );
};
