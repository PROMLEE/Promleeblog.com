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
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && el.offsetWidth >= 300) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          observer.disconnect();
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return pathname.startsWith("/test") ||
    pathname.startsWith("/aboutme") ? null : (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", ...style, width: "100%" }}
      data-ad-client={"ca-pub-" + process.env.NEXT_PUBLIC_GAPID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-ad-layout-key={layoutKey}
    />
  );
};

export default AdComponent;
