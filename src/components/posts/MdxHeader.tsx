import React from "react";
import { MdxMeta } from "@/config/types";

export const MdxHeader = ({ props }: { props: string }) => {
  return <h1 className="w-full text-center">{props}</h1>;
};
