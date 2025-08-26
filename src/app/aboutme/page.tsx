"use client";
import { lazy, Suspense } from "react";
import SlideLayout from "@/components/common/SlideLayout";

// 성능 최적화를 위한 동적 임포트
const IntroSlide = lazy(() => import("@/components/pt/slides/Intro"));
const KeyAchievementsSlide = lazy(
  () => import("@/components/pt/slides/KeyAchievements"),
);
const TeamProjectsSlide = lazy(
  () => import("@/components/pt/slides/TeamProjects"),
);
const PersonalProjectsSlide = lazy(
  () => import("@/components/pt/slides/PersonalProjects"),
);
const ExperiencePT = lazy(() => import("@/components/pt/Experience"));
const SkillsPT = lazy(() => import("@/components/pt/Skills"));
const ProjectsPT = lazy(() => import("@/components/pt/Projects"));
const EducationPT = lazy(() => import("@/components/pt/Education"));

// 로딩 상태 표시 컴포넌트
const SlideLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

export default function PTPage() {
  const slides = [
    <Suspense key="intro" fallback={<SlideLoader />}>
      <IntroSlide />
    </Suspense>,
    <Suspense key="experience" fallback={<SlideLoader />}>
      <ExperiencePT />
    </Suspense>,
    <Suspense key="achievements" fallback={<SlideLoader />}>
      <KeyAchievementsSlide />
    </Suspense>,
    <Suspense key="skills" fallback={<SlideLoader />}>
      <SkillsPT />
    </Suspense>,
    <Suspense key="personal-projects" fallback={<SlideLoader />}>
      <PersonalProjectsSlide />
    </Suspense>,
    <Suspense key="team-projects" fallback={<SlideLoader />}>
      <TeamProjectsSlide />
    </Suspense>,
    <Suspense key="projects" fallback={<SlideLoader />}>
      <ProjectsPT />
    </Suspense>,
    <Suspense key="education" fallback={<SlideLoader />}>
      <EducationPT />
    </Suspense>,
  ];

  // 우측 상단에 표시할 링크 그룹
  const aboutmeLinks = (
    <div className="flex gap-3">
      <a
        href="/aboutme/promleeblog"
        className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-500 hover:text-white"
      >
        Promleeblog
      </a>
      <a
        href="/aboutme/map2zero"
        className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-500 hover:text-white"
      >
        Map2Zero
      </a>
      <a
        href="/download/jjiggo.pdf"
        className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-500 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        찍고머니
      </a>
    </div>
  );

  return (
    <SlideLayout
      slides={slides}
      homeLink={{
        href: "/",
        label: "홈으로",
      }}
      brandElement={aboutmeLinks}
    />
  );
}
