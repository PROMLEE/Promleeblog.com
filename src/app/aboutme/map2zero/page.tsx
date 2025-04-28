"use client";
import { lazy, Suspense } from "react";
import SlideLayout from "@/components/common/SlideLayout";

// 성능 최적화를 위한 동적 임포트
const Page1 = lazy(() => import("@/components/aboutme/map2zero/Page1"));
const Page2 = lazy(() => import("@/components/aboutme/map2zero/Page2"));
const Page3 = lazy(() => import("@/components/aboutme/map2zero/Page3"));
const Page4 = lazy(() => import("@/components/aboutme/map2zero/Page4"));
const Page5 = lazy(() => import("@/components/aboutme/map2zero/Page5"));
const Page6 = lazy(() => import("@/components/aboutme/map2zero/Page6"));
const Page7 = lazy(() => import("@/components/aboutme/map2zero/Page7"));

// 로딩 상태 표시 컴포넌트
const SlideLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
  </div>
);

const MapZeroPage = () => {
  // Map2Zero 브랜드 요소
  const brandElement = (
    <span className="text-xl font-extrabold tracking-wide text-green-600">
      map2zero
    </span>
  );

  const slides = [
    <Suspense key="map2zero-page1" fallback={<SlideLoader />}>
      <Page1 />
    </Suspense>,
    <Suspense key="map2zero-page2" fallback={<SlideLoader />}>
      <Page2 />
    </Suspense>,
    <Suspense key="map2zero-page3" fallback={<SlideLoader />}>
      <Page3 />
    </Suspense>,
    <Suspense key="map2zero-page4" fallback={<SlideLoader />}>
      <Page4 />
    </Suspense>,
    <Suspense key="map2zero-page5" fallback={<SlideLoader />}>
      <Page5 />
    </Suspense>,
    <Suspense key="map2zero-page6" fallback={<SlideLoader />}>
      <Page6 />
    </Suspense>,
    <Suspense key="map2zero-page7" fallback={<SlideLoader />}>
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
};

export default MapZeroPage;

