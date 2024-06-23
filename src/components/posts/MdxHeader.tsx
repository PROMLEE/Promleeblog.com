import React from "react";

export const MdxHeader = ({ props }: { props: any }) => {
  return (
    <div>
      <h1 className="mt-36 w-full text-center text-4xl font-bold text-text-foreground">
        {props.nameko}
        <div className="mb-36 mt-10 w-full text-center text-3xl font-bold text-text">
          {props.nameko !== props.name && props.name}
        </div>
      </h1>
    </div>
  );
};
