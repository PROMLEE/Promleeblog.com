/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
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
  useEffect(() => {
    try {
      // 광고 태그 초기화
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, [adSlot, adFormat, adLayout, layoutKey]);

  return pathname.startsWith("/test") ||
    pathname.startsWith("/aboutme") ? null : (
    <ins
      key={adSlot} // 추가
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
