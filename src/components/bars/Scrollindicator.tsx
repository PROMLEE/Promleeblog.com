"use client";
import { useEffect, useState } from "react";

export default function Indicator() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompleltion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100,
        );
      }
    };

    window.addEventListener("scroll", updateScrollCompleltion);

    return () => {
      window.removeEventListener("scroll", updateScrollCompleltion);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 h-[0.2rem] w-full ${completion < 5 && "bg-foreground"}`}
    >
      <div
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="h-full w-full bg-text-foreground"
      />
    </div>
  );
}
