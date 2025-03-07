import React from "react";
import Image from "next/image";

interface HeaderProps {
  thumbnail_url: string;
  nameko: string;
  name: string;
}

export const MdxHeader = ({ props }: { props: HeaderProps }) => {
  return (
    <div>
      <h1 className="relative z-10 mt-36 w-full text-center text-4xl font-bold text-text-foreground">
        <div className="absolute -top-20 flex w-full flex-col items-center">
          <Image
            className="z-[-1] opacity-20"
            src={
              props.thumbnail_url.startsWith("/")
                ? `https://cdn.promleeblog.com/posts${props.thumbnail_url}`
                : props.thumbnail_url
            }
            alt={""}
            height="0"
            width="300"
          />
        </div>
        {props.nameko}
        <div className="z-10 mb-36 mt-10 w-full text-center text-3xl font-bold text-text">
          {props.nameko !== props.name && props.name}
        </div>
      </h1>
    </div>
  );
};
