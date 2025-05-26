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
  const adRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 광고를 로드하기 전에 컨테이너가 렌더링됐는지 확인
    if (adRef.current && adRef.current.clientWidth > 0) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error("Error loading ads:", e);
      }
    }
  }, []);

  return pathname.startsWith("/test") ||
    pathname.startsWith("/aboutme") ? null : (
    <div ref={adRef} className="min-h-[100px] w-full">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
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

