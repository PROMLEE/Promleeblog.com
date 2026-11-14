"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { projectMessages } from "@/lib/i18n/projects";
import { localizePath, type Locale } from "@/lib/i18n/routing";
import styles from "./ProjectsLink.module.css";

export default function ProjectsLink({ locale }: { locale: Locale }) {
  const t = projectMessages[locale];
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
      <Link
        href={localizePath("/projects", locale)}
        aria-describedby={open ? tooltipId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="hover:bg-button/90 hover:text-background focus-visible:bg-button/90 focus-visible:text-background inline-flex items-center rounded-md px-3 py-1.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {t.menu}
      </Link>
      {open && (
        <div id={tooltipId} role="tooltip" className={styles.tooltip}>
          <strong>{t.title}</strong>
          <span>{t.intro}</span>
        </div>
      )}
    </div>
  );
}
