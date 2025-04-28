"use client";
import { lazy, Suspense } from "react";
import SlideLayout from "@/components/common/SlideLayout";

// 성능 최적화를 위한 동적 임포트
const Page1 = lazy(() => import("@/components/aboutme/promleeblog/Page1"));
const Page2 = lazy(() => import("@/components/aboutme/promleeblog/Page2"));
const Page3 = lazy(() => import("@/components/aboutme/promleeblog/Page3"));
const Page4 = lazy(() => import("@/components/aboutme/promleeblog/Page4"));
const Page5 = lazy(() => import("@/components/aboutme/promleeblog/Page5"));
const Page6 = lazy(() => import("@/components/aboutme/promleeblog/Page6"));
const Page7 = lazy(() => import("@/components/aboutme/promleeblog/Page7"));

// 로딩 상태 표시 컴포넌트
const SlideLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

export default function PromleeblogPTPage() {
  // PromleeBlog 브랜드 요소
  const brandElement = (
    <span className="text-xl font-extrabold tracking-wide text-blue-600">
      PromleeBlog
    </span>
  );

  const slides = [
    <Suspense key="promleeblog-page1" fallback={<SlideLoader />}>
      <Page1 />
    </Suspense>,
    <Suspense key="promleeblog-page2" fallback={<SlideLoader />}>
      <Page2 />
    </Suspense>,
    <Suspense key="promleeblog-page3" fallback={<SlideLoader />}>
      <Page3 />
    </Suspense>,
    <Suspense key="promleeblog-page4" fallback={<SlideLoader />}>
      <Page4 />
    </Suspense>,
    <Suspense key="promleeblog-page5" fallback={<SlideLoader />}>
      <Page5 />
    </Suspense>,
    <Suspense key="promleeblog-page6" fallback={<SlideLoader />}>
      <Page6 />
    </Suspense>,
    <Suspense key="promleeblog-page7" fallback={<SlideLoader />}>
      <Page7 />
    </Suspense>,
  ];

  return (
    <SlideLayout
      slides={slides}
      homeLink={{
        href: "/aboutme",
        label: "About Me 홈",
      }}
      brandElement={brandElement}
    />
  );
}
