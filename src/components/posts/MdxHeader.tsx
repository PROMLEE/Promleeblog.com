import React from "react";
import { MdxMeta } from "@/config/types";

export const MdxHeader = ({ props }: { props: MdxMeta }) => {
  return <h1 className="w-full text-center">{props.title}</h1>;
};
