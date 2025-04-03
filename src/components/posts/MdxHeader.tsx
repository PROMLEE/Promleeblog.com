import React from "react";

interface HeaderProps {
  thumbnail_url: string;
  nameko: string;
  name: string;
}

export const MdxHeader = ({ props }: { props: HeaderProps }) => {
  return (
    <div className="my-28">
      <h1 className="relative z-10 mt-36 w-full text-center text-4xl font-bold text-text-foreground">
        <div className="absolute -top-20 flex w-full flex-col items-center md:max-h-20">
          <img
            className="z-[-1] h-40 opacity-20 md:h-60"
            src={
              props.thumbnail_url
                ? props.thumbnail_url.startsWith("/")
                  ? `https://cdn.promleeblog.com${props.thumbnail_url}`
                  : props.thumbnail_url
                : "/icons/android-chrome-512x512.png"
            }
            alt={"posting thumbnail"}
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
