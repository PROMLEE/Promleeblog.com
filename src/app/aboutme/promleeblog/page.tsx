"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Page1 } from "@/components/aboutme/promleeblog/Page1";
import { Page2 } from "@/components/aboutme/promleeblog/Page2";
import { Page3 } from "@/components/aboutme/promleeblog/Page3";
import { Page4 } from "@/components/aboutme/promleeblog/Page4";
import { Page5 } from "@/components/aboutme/promleeblog/Page5";
import { Page6 } from "@/components/aboutme/promleeblog/Page6";
import { Page7 } from "@/components/aboutme/promleeblog/Page7";

const slides = [
  { component: <Page1 /> },
  { component: <Page2 /> },
  { component: <Page3 /> },
  { component: <Page4 /> },
  { component: <Page5 /> },
  { component: <Page6 /> },
  { component: <Page7 /> },
];

export default function PromleeblogPTPage() {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const maxIdx = slides.length - 1;

  // 키보드 좌우 방향키로 슬라이드 이동
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setPrevIdx(idx);
        setIdx((prev) => (prev < maxIdx ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setPrevIdx(idx);
        setIdx((prev) => (prev > 0 ? prev - 1 : prev));
      }
    },
    [idx, maxIdx],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 클릭으로도 넘길 수 있게
  const handleNext = () => {
    setPrevIdx(idx);
    setIdx((prev) => (prev < maxIdx ? prev + 1 : prev));
  };
  const handlePrev = () => {
    setPrevIdx(idx);
    setIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4">
      <div className="relative flex w-full max-w-4xl items-center justify-center select-none">
        <div className="flex w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx > prevIdx ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: idx < prevIdx ? 100 : -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              {slides[idx].component}
            </motion.div>
          </AnimatePresence>
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
