import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSS 클래스 병합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 텍스트에서 강조할 부분 하이라이트 유틸리티
export function highlightText(
  text: string,
  pattern: RegExp,
  maxHighlights: number = 2,
  highlightClass: string = "font-bold text-white",
) {
  let count = 0;
  return text
    .split(pattern)
    .map((part, i) => {
      if (i % 2 === 1 && count < maxHighlights) {
        count++;
        return `<span class="${highlightClass}">${part}</span>`;
      }
      return part;
    })
    .join("");
}
