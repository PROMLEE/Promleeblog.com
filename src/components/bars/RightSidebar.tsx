"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AdComponent from "../ads/adsense";

const parseToc = (content: string) => {
  const regex = /^(#|##|###) (.*$)/gim;
  const headingList = content.match(regex);

  const toc: string[] = [];
  return (
    headingList?.map((heading: string) => {
      let link =
        "#" +
        heading
          .trim()
          .replace("# ", "")
          .replace("#", "")
          .replace(/[\[\]:!@#$/%^&*()+=,.'"]/g, "")
          .replace(/ /g, "-")
          .toLowerCase()
          .replace("?", "");
      if (toc.includes(link)) {
        let i = 1;
        while (toc.includes(link + "-" + i)) {
          i++;
        }
        link = link + "-" + i;
      }
      toc.push(link);
      return {
        text: heading.replaceAll("# ", "").replaceAll("#", ""),
        link: link,
        indent: heading.match(/#/g)?.length || 2,
      };
    }) || []
  );
};

const RightSidebarComp = ({ content }: { content: string }) => {
  const observer = useRef<IntersectionObserver>(undefined);
  const [tocs, setTocs] = useState<string[]>([]);
  const [activeToc, setActiveToc] = useState("");
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            setTocs((prev) => [...prev, id]);
            setActiveToc("");
          } else {
            setTocs((prev) => {
              if (prev.length === 1) setActiveToc(id);
              return prev.filter((toc) => toc !== id);
            });
          }
        });
      },
      { rootMargin: "10px 0px 0px 0px" },
    );
    const headingElements = document.querySelectorAll("h1, h2, h3");
    headingElements.forEach((element) => observer.current?.observe(element));
    return () => observer.current?.disconnect();
  }, []);
  const toc = parseToc(content);
  return (
    <div className="related md:sidebar-md mb-10 border-y-2 py-3 md:mb-0 md:border-none xl:right-5">
      {toc.map((item, idx) => {
        const active = [...tocs, activeToc].includes(item.link);
        if (item.indent === 1) {
          return (
            <div key={idx} className={`sidebar`}>
              <Link
                href={item.link}
                className={`sidebar text-text-foreground mt-3 indent-[-5px] text-sm font-bold ${active && "md:text-blue-700 md:dark:text-blue-400"}`}
              >
                💡 {item.text.split("(")[0]}
              </Link>
            </div>
          );
        } else if (item.indent === 2) {
          return (
            <div key={idx} className={`sidebar`}>
              <Link
                href={item.link}
                className={`sidebar text-text-foreground ml-8 indent-[-20px] text-xs ${active && "md:text-blue-700 md:dark:text-blue-400"}`}
              >
                🚀 {item.text.split("(")[0]}
              </Link>
            </div>
          );
        } else if (item.indent === 3) {
          return (
            <div key={idx} className={`sidebar`}>
              <Link
                href={item.link}
                className={`sidebar text-text ml-10 indent-[-20px] text-xs ${active && "md:text-blue-700 md:dark:text-blue-400"}`}
              >
                ✅ {item.text.split("(")[0]}
              </Link>
            </div>
          );
        }
      })}
      <div className="h-10" />
      <AdComponent adSlot="6339310501" adFormat="auto" />
      <div className="h-10" />
      <AdComponent adSlot="6339310501" adFormat="auto" />
    </div>
  );
};

export default RightSidebarComp;
