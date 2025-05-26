"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  layoutKey?: string;
  style?: React.CSSProperties;
}

const AdComponent = ({
  adSlot,
  adFormat = "auto",
  adLayout = "",
  layoutKey = "",
  style,
}: AdComponentProps) => {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const alreadyLoaded = ref.current?.getAttribute("data-loaded");
        if (alreadyLoaded === "true") return;

        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          ref.current?.setAttribute("data-loaded", "true");
        } catch (e) {
          console.error("AdSense error:", e);
        }

        observer.disconnect();
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    console.log("ref width:", ref.current?.offsetWidth);
  }, []);

  if (pathname.startsWith("/test") || pathname.startsWith("/aboutme")) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
        }}
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
