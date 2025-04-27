"use client";
import { useState, useCallback, useEffect } from "react";
import SkillsPT from "@/components/pt/Skills";
import ProjectsPT from "@/components/pt/Projects";
import ExperiencePT from "@/components/pt/Experience";
import EducationPT from "@/components/pt/Education";
import IntroSlide from "@/components/pt/slides/Intro";
import KeyAchievementsSlide from "@/components/pt/slides/KeyAchievements";
import PersonalProjectsSlide from "@/components/pt/slides/PersonalProjects";
import TeamProjectsSlide from "@/components/pt/slides/TeamProjects";
import Link from "next/link";
// KeyAchievementsSlide import 예정

const slides = [
  { component: <IntroSlide /> },
  { component: <KeyAchievementsSlide /> },
  { component: <SkillsPT /> },
  { component: <PersonalProjectsSlide /> },
  { component: <TeamProjectsSlide /> },
  { component: <ProjectsPT /> },
  { component: <ExperiencePT /> },
  { component: <EducationPT /> },
];

export default function PTPage() {
  const [idx, setIdx] = useState(0);
  const maxIdx = slides.length - 1;

  // 키보드 좌우 방향키로 슬라이드 이동
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setIdx((prev) => (prev < maxIdx ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setIdx((prev) => (prev > 0 ? prev - 1 : prev));
      }
    },
    [maxIdx],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 클릭으로도 넘길 수 있게
  const handleNext = () => setIdx((prev) => (prev < maxIdx ? prev + 1 : prev));
  const handlePrev = () => setIdx((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4">
      {/* 좌측 상단 홈 버튼 */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 rounded-xl bg-white/80 px-4 py-2 text-base font-bold text-blue-600 shadow transition-colors hover:bg-blue-500 hover:text-white"
      >
        홈으로
      </Link>
      <div className="relative flex w-full max-w-7xl items-center justify-center select-none">
        <div className="flex w-full items-center justify-center">
          {slides[idx].component}
        </div>
      </div>
      {/* Prev/Next 버튼을 인디케이터 좌우로 배치 */}
      <div className="mt-6 flex flex-row items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={idx === 0}
          className="text-4xl text-gray-400 hover:text-blue-500 disabled:opacity-30"
          aria-label="이전 슬라이드"
        >
          &#8592;
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${i === idx ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={idx === maxIdx}
          className="text-4xl text-gray-400 hover:text-blue-500 disabled:opacity-30"
          aria-label="다음 슬라이드"
        >
          &#8594;
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-400">
        ← → 방향키 또는 클릭으로 넘길 수 있습니다
      </div>
    </div>
  );
}
