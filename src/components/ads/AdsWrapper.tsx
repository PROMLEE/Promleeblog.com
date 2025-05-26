// components/mdx/AdsWrapper.tsx
"use client";

import { createContext, useContext, useState } from "react";
import AdComponent from "./adsense";

const adsConfig = [
  {
    adSlot: "2713309110", // Ads1
    adFormat: "fluid",
    style: { textAlign: "center" as const },
  },
  {
    adSlot: "2890712597", // Ads2
    adFormat: "fluid",
    adLayout: "in-article",
    style: { textAlign: "center" as const },
  },
  {
    adSlot: "6309773342", // Ads3
    adFormat: "fluid",
    adLayout: "in-article",
    style: { textAlign: "center" as const },
  },
  {
    adSlot: "4201041797", // Ads4
    adFormat: "fluid",
    adLayout: "in-article",
    style: { textAlign: "center" as const },
  },
  {
    adSlot: "7290848373", // Ads5
    adFormat: "fluid",
    adLayout: "in-article",
    style: { textAlign: "center" as const },
  },
];

const AdIndexContext = createContext<{
  index: number;
  increment: () => void;
}>({
  index: 0,
  increment: () => {},
});

export const AdsProvider = ({ children }: { children: React.ReactNode }) => {
  const [index, setIndex] = useState(0);
  return (
    <AdIndexContext.Provider
      value={{
        index,
        increment: () => setIndex((prev) => prev + 1),
      }}
    >
      {children}
    </AdIndexContext.Provider>
  );
};

export const Ads = () => {
  const { index, increment } = useContext(AdIndexContext);
  const config = adsConfig[index];

  if (!config) {
    console.warn("광고 위치 초과됨. 설정된 adSlot 수보다 Ads 태그가 많습니다.");
    return null;
  }

  increment();

  return <AdComponent {...config} />;
};
