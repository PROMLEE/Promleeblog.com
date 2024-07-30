import React from "react";
import Image from "next/image";

export const Page3 = () => {
  return (
    <div className="flex w-full flex-col">
      <h1>3. My Role - 1</h1>
      <div className="flex gap-5">
        <div className="flex-[0.8]">
          <h2>
            <a href="https://github.com/PROMLEE/map2zero-frontend/blob/main/src/pages/Login/KakaoLoginHandeler.tsx">
              Kakao 로그인 구현 🔗
            </a>
          </h2>
          <div>Kakao에서 지원하는 Rest api 방식의 Oauth 로그인을 구현</div>
          <ol className="marker:text-white">
            <li>
              1차적으로 서버에 로그인을 하겠다는 요청을 보내 가짜 토큰을
              발급받음
            </li>
            <li>
              사용자가 Kakao 로그인에 성공 시 받은 accessToken과 이전에 가지고
              있던 가짜 토큰을 함께 서버로 전송(
              <div className="text-underlined">CSRF 방지</div>)
            </li>
            <li>
              서버에서 받은 로그인 토큰을 이용해 localstorage에 저장하고 로그인
            </li>
          </ol>
          <h2>
            <a href="https://github.com/PROMLEE/map2zero-frontend/blob/main/src/pages/Map.tsx">
              Naver map 활용 데이터 표시 🔗
            </a>
          </h2>
          <div>Naver map Api를 활용하여 매장 상세 정보를 지도에 표시</div>
          <ol className="marker:text-white">
            <li>
              <div className="text-underlined">현재 위치 권한</div>을 받아
              사용자의 위치를 기준으로 가까운 매장을 표시
            </li>
            <li>
              최적화를 위해 화면에 보이는 매장만 표시하고 이외의 마커는 숨김
            </li>
            <li>
              줌앤 아웃, 드래그, 클릭 등의 이벤트를 활용해 사용자가 편리하게
              매장 정보를 확인할 수 있도록 구현
            </li>
          </ol>
        </div>
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/2.png"
          alt="logo"
          width={250}
          height={50}
          className="flex-[0.2] rounded-lg"
        />
      </div>
    </div>
  );
};
