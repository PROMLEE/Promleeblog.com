import React from "react";
import Image from "next/image";

export const Page3 = () => {
  return (
    <div className="flex w-full flex-col">
      <h1>3. My Role</h1>
      <div className="flex gap-5">
        <div className="flex-1">
          <h2>네이버 지도 커스텀</h2>
          <div></div>
        </div>
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/2.png"
          alt="logo"
          width={200}
          height={100}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
