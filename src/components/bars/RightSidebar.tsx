"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const parseToc = (content: string) => {
  const regex = /^(#|##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replaceAll("# ", "").replaceAll("#", ""),
      link:
        "#" +
        heading
          .replace("# ", "")
          .replace("#", "")
          .replace(/[\[\]:!@#$/%^&*()+=,.'"]/g, "")
          .replace(/ /g, "-")
          .toLowerCase()
          .replace("?", ""),
      indent: heading.match(/#/g)?.length || 2,
    })) || []
  );
};

const RightSidebarComp = ({ content }: { content: string }) => {
  const observer = useRef<IntersectionObserver>();
  const [activeToc, setActiveToc] = useState("");
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveToc(`#${entry.target.id}`);
            console.log(activeToc);
          }
        });
      },
      {
        rootMargin: "0px 0px -95% 0px",
        threshold: 1.0,
      },
    );
    const headingElements = document.querySelectorAll("h1, h2, h3");
    headingElements.forEach((element) => observer.current?.observe(element));
    return () => observer.current?.disconnect();
  }, []);
  const toc = parseToc(content);
  return (
    <div className="related md:sidebar-md mb-10 border-y-2 py-3 md:mb-0 md:border-none xl:right-5">
      {toc.map((item, idx) => {
        if (item.indent === 1) {
          return (
            <div key={idx} className="sidebar">
              <a
                href={item.link}
                className={`sidebar mt-3 indent-[-5px] text-sm font-bold text-text ${activeToc === item.link && "bg-foreground"}`}
              >
                💡 {item.text.split("(")[0]}
              </a>
            </div>
          );
        } else if (item.indent === 2) {
          return (
            <div key={idx} className="sidebar">
              <a
                href={item.link}
                className={`sidebar ml-8 indent-[-20px] text-xs  ${activeToc === item.link && "bg-foreground"}`}
              >
                🚀 {item.text.split("(")[0]}
              </a>
            </div>
          );
        } else if (item.indent === 3) {
          return (
            <div key={idx} className="sidebar">
              <a
                href={item.link}
                className={`sidebar ml-10 indent-[-20px] text-xs text-text ${activeToc === item.link && "bg-foreground"}`}
              >
                ✅ {item.text.split("(")[0]}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RightSidebarComp;
