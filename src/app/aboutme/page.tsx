"use client";
import Image from "next/image";
import { Contact } from "../../components/aboutme/Contact";
import { AboutMe } from "../../components/aboutme/AboutMe";
import { Skills } from "../../components/aboutme/Skills";
import { Projects } from "../../components/aboutme/Projects";
import { Exprience } from "../../components/aboutme/Exprience";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { useRef } from "react";
import { useIsVisible } from "@/lib/useIsVisible";
import { Education } from "@/components/aboutme/Education";

export default function App() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const aboutmeVisible = useIsVisible(ref1);
  const skillsVisible = useIsVisible(ref2);
  const projectsVisible = useIsVisible(ref3);
  const experienceVisible = useIsVisible(ref4);
  const educationVisible = useIsVisible(ref5);

  return (
    <>
      <Toup />
      <div
        className={
          "prose my-10 flex flex-col items-center gap-20 dark:prose-invert md:px-20"
        }
      >
        <div className="w-full">
          <h2>👨‍💻안녕하세요, 풀스택 개발자 이동훈입니다</h2>
          <div className="flex flex-wrap gap-10">
            <div className="relative mb-10 mt-[2em] h-[10rem] w-[10rem]">
              <Image
                src="https://avatars.githubusercontent.com/u/80230701?v=4?s=400"
                alt="profile_image"
                fill
                className="m-0 w-full rounded-lg border border-foreground"
              />
            </div>
            <Contact />
          </div>
        </div>{" "}
        <div
          ref={ref1}
          className={`w-full duration-1000 ease-in ${aboutmeVisible ? "scale-100 opacity-100" : "scale-110 opacity-25"}`}
        >
          <AboutMe />
        </div>
        <div
          ref={ref2}
          className={`w-full duration-1000 ease-in ${skillsVisible ? "scale-100 opacity-100" : "scale-110 opacity-25"}`}
        >
          <Skills />
        </div>
        <div
          ref={ref3}
          className={`w-full duration-1000 ease-in ${projectsVisible ? "scale-100 opacity-100" : "scale-110 opacity-25"}`}
        >
          <Projects />
        </div>
        <div
          ref={ref4}
          className={`w-full duration-1000 ease-in ${experienceVisible ? "scale-100 opacity-100" : "scale-110 opacity-25"}`}
        >
          <Exprience />
        </div>
        <div
          ref={ref5}
          className={`w-full duration-700 ease-in ${educationVisible ? "scale-100 opacity-100" : "scale-110 opacity-25"}`}
        >
          <Education />
        </div>
      </div>
      <Todown />
    </>
  );
}
