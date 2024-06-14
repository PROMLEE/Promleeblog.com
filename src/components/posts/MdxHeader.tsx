import React from "react";
// import { MdxMeta } from "@/config/types";

export const MdxHeader = ({ props }: { props: string }) => {
  return (
    <h1 className="my-40 w-full text-center text-4xl font-bold text-text-foreground">
      {props}
    </h1>
  );
};
