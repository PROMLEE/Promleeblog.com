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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!ref.current) return;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("AdSense loaded after window.onload");
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    if (document.readyState === "complete") {
      // 이미 로드된 상태면 바로 실행
      loadAd();
    } else {
      window.addEventListener("load", loadAd);
    }

    return () => {
      window.removeEventListener("load", loadAd);
    };
  }, []);

  return pathname.startsWith("/test") ||
    pathname.startsWith("/aboutme") ? null : (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={"ca-pub-" + process.env.NEXT_PUBLIC_GAPID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-ad-layout-key={layoutKey}
    ></ins>
  );
};

export default AdComponent;
