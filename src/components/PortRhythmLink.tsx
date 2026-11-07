"use client";

import { useId, useState } from "react";
import styles from "./PortRhythmLink.module.css";

export default function PortRhythmLink() {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <a
        href="https://pf.promleeblog.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="포트리듬 둘러보기 (새 탭)"
        aria-describedby={open ? tooltipId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="group relative inline-flex min-h-[40px] items-center overflow-hidden rounded-lg px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="group-hover:text-background group-focus-visible:text-background relative z-10 inline-flex items-center gap-1 transition-colors duration-200">
          포트리듬 <span aria-hidden="true">↗</span>
        </span>
        <span
          aria-hidden="true"
          className="bg-button/0 group-hover:bg-button/90 group-focus-visible:bg-button/90 absolute inset-0 z-0 rounded-md transition-colors duration-300"
        />
      </a>
      {open && (
        <div id={tooltipId} role="tooltip" className={styles.tooltip}>
          <strong>내 자산과 투자 비중을 한눈에</strong>
          <span>
            직접 만든 포트폴리오 자산관리 도구예요. 목표 비중과 리밸런싱도 함께
            확인해 보세요.
          </span>
        </div>
      )}
    </div>
  );
}
