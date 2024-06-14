import React from "react";
import { MDXMeta } from "@/config/types";
export const MdxHeader = ({ props }: { props: MDXMeta }) => {
  return (
    <div>
      {props.title}
      {props.date}
    </div>
  );
};
