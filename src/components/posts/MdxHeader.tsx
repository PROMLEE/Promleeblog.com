import React from "react";

export const MdxHeader = ({ props }: { props: any }) => {
  return (
    <h1 className="my-40 w-full text-center text-4xl font-bold text-text-foreground">
      {props.nameko}
      <div className="h-3" />
      {props.nameko !== props.name && props.name}
    </h1>
  );
};
