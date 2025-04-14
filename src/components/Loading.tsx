import React from "react";

export const Loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-black opacity-20">
      <div className="animate-bounce text-4xl text-text-foreground">
        loading..🐩🐩🐩🐩
      </div>
    </div>
  );
};
