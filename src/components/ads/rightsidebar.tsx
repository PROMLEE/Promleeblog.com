/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
}

const AdComponent: React.FC<AdComponentProps> = ({
  adSlot,
  adFormat = "auto",
  adLayout = "",
}) => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3676142732860199"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
    ></ins>
  );
};

export default AdComponent;
