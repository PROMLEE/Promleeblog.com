"use client";
import Image from "next/image";
import { Contact } from "@/components/aboutme/Contact";
import { AboutMe } from "@/components/aboutme/AboutMe";
import { Skills } from "@/components/aboutme/Skills";
import { Projects } from "@/components/aboutme/Projects";
import { Exprience } from "@/components/aboutme/Exprience";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { useRef } from "react";
import { useIsVisible } from "@/lib/useIsVisible";
import { Education } from "@/components/aboutme/Education";
import RightSidebarComp from "@/components/bars/RightSidebar";

interface refs {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  component: React.FC;
}

const contents =
  "## Contact & Channels\n## About Me\n## Skills\n## Contribute to\n### PromleeBlog\n### Map:2 Zero\n### Indoor Map\n## Experience\n### UMC 5th, 6th\n## Education";

export default function App() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const aboutmeVisible = useIsVisible(ref1);
  const skillsVisible = useIsVisible(ref2);
  // const projectsVisible = useIsVisible(ref3);
  const experienceVisible = useIsVisible(ref4);
  const educationVisible = useIsVisible(ref5);

  const reflist: refs[] = [
    { ref: ref1, isVisible: aboutmeVisible, component: AboutMe },
    { ref: ref2, isVisible: skillsVisible, component: Skills },
    { ref: ref3, isVisible: true, component: Projects },
    { ref: ref4, isVisible: experienceVisible, component: Exprience },
    { ref: ref5, isVisible: educationVisible, component: Education },
  ];

  return (
    <>
      <Toup />
      <div
        className={
          "prose my-10 flex flex-col items-center gap-20 dark:prose-invert md:px-20"
        }
      >
        <div className="w-full">
          <h2>👨‍💻안녕하세요, 도전을 두려워 않는 개발자 이동훈입니다</h2>
          <div className="flex flex-wrap gap-10">
            <div className="relative mb-10 mt-[2em] h-[13rem] w-[10rem]">
              <Image
                src="https://cdn.promleeblog.com/profile.jpeg"
                alt="profile_image"
                fill
                className="m-0 w-full rounded-lg border border-foreground"
              />
            </div>
            <Contact />
          </div>
        </div>
        {reflist.map((ref, index) => {
          return (
            <div
              key={index}
              ref={ref.ref}
              className={`w-full duration-1000 ease-in ${
                ref.isVisible ? "scale-100 opacity-100" : "scale-105 opacity-25"
              }`}
            >
              <ref.component />
            </div>
          );
        })}
      </div>
      <RightSidebarComp content={contents} />
      <Todown />
    </>
  );
}
