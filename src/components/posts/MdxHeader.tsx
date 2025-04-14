import { ImageUrl } from "@/lib/PostUtils/getImageUrl";
import React from "react";

interface HeaderProps {
  thumbnail_url: string;
  nameko: string;
  name: string;
}

export const MdxHeader = ({ props }: { props: HeaderProps }) => {
  return (
    <div className="my-28">
      <h1 className="text-text-foreground relative z-10 mt-36 w-full text-center text-4xl font-bold">
        <div className="absolute -top-10 flex w-full flex-col items-center md:max-h-20">
          <img
            className="z-[-1] h-40 opacity-20 md:h-60"
            src={ImageUrl(props.thumbnail_url)}
            alt={"posting thumbnail"}
          />
        </div>
        {props.nameko}
        <div className="text-text z-10 mt-10 mb-36 w-full text-center text-3xl font-bold">
          {props.nameko !== props.name && props.name}
        </div>
      </h1>
    </div>
  );
};

