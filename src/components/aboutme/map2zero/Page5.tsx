import React from "react";
import Image from "next/image";

export const Page5 = () => {
  return (
    <div className="flex w-full flex-col">
      <h2 className="m-0">관련 UI</h2>
      <div className="flex gap-32">
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/3.png"
          alt="logo"
          width={200}
          height={50}
          className="flex-1 rounded-lg"
        />
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/4.png"
          alt="logo"
          width={200}
          height={50}
          className="flex-1 rounded-lg"
        />
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/5.png"
          alt="logo"
          width={200}
          height={50}
          className="flex-1 rounded-lg"
        />
      </div>
    </div>
  );
};
