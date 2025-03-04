"use client";

import React from "react";
import { ReactNode } from "react";

/** React 노드에서 텍스트 추출 (줄바꿈 포함) */
const extractText = (node: ReactNode): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join(""); // 공백 없이 그대로 유지
  if (typeof node === "object" && node && "props" in node)
    return extractText(node.props.children);
  return "";
};

/** 모든 children이 <span> 태그 안에 있는지 검사 (줄바꿈 허용) */
const isWrappedWithSpan = (children: ReactNode): boolean => {
  if (!children) return false;

  if (Array.isArray(children)) {
    return children.every(
      (child) =>
        typeof child === "string" || // 줄바꿈("\n") 포함 문자열 허용
        (React.isValidElement(child) && child.type === "span"), // <span> 요소만 허용
    );
  }

  return (
    React.isValidElement(children) && children.type === "span" // <span> 요소만 허용
  );
};

export const CopyButton = ({ children }: { children: ReactNode }) => {
  // const [copied, setCopied] = useState(false);

  // 모든 children이 <span> 태그 또는 문자열("\n")이면 버튼 표시
  if (!isWrappedWithSpan(children)) {
    return null;
  }

  // 텍스트 추출 (줄바꿈 유지)
  const textToCopy = extractText(children).trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    // setCopied(true);
    // setTimeout(() => setCopied(false), 1000);
  };

  return (
    <span
      onClick={copyToClipboard}
      className="absolute right-0 top-0 cursor-pointer"
    >
      <svg
        className="h-6 w-6 stroke-slate-500 hover:stroke-blue-500 active:stroke-pink-300 dark:stroke-slate-500 dark:hover:stroke-blue-500 dark:active:stroke-pink-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="current"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
        />
      </svg>
    </span>
  );
};
