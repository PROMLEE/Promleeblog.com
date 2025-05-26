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
    const tryPushAd = () => {
      const el = ref.current;
      if (!el) return;

      const width = el.offsetWidth;
      console.log("Ad ref offsetWidth:", width);

      if (width < 300) {
        // 너비 확보될 때까지 재시도
        setTimeout(tryPushAd, 300);
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("AdSense pushed successfully");
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    if (document.readyState === "complete") {
      tryPushAd();
    } else {
      window.addEventListener("load", tryPushAd);
      return () => window.removeEventListener("load", tryPushAd);
    }
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
