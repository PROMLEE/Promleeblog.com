"use client";

// @ts-ignore
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
  url: string | undefined;
};

function ReactSwagger({ spec }: Props) {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    return (
      <div className="bg-white pt-6">
        <section className="container">
          <SwaggerUI spec={spec} />
        </section>
      </div>
    );
  } else {
    return (
      <div className="mt-10 bg-background text-text">
        Swagger 화면은 개발자 모드에서 접속해주세요
      </div>
    );
  }
}

export default ReactSwagger;
