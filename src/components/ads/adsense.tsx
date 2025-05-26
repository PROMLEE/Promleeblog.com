"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  layoutKey?: string;
  style?: React.CSSProperties;
}

const AdComponent: React.FC<AdComponentProps> = ({
  adSlot,
  adFormat = "auto",
  adLayout = "",
  layoutKey = "",
  style,
}) => {
  const pathname = usePathname();
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("Error loading ads:", e);
          }
          observer.disconnect(); // 한 번만 로드
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [pathname]); // pathname이 바뀌면 광고 다시 시도

  if (pathname.startsWith("/test") || pathname.startsWith("/aboutme")) {
    return null;
  }

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 100, minWidth: 300, ...style }}
        data-ad-client={"ca-pub-" + process.env.NEXT_PUBLIC_GAPID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={layoutKey}
      ></ins>
    </div>
  );
};

export default AdComponent;
