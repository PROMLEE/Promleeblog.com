"use client";

import { Check } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";

export default function Pre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className="absolute top-4 right-4 z-10 size-6"
      >
        {isCopied ? (
          <Check className="text-green-400" width={16} height={16} />
        ) : (
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
        )}
      </button>
      <pre ref={preRef} {...props} className={"mt-0"}>
        {children}
      </pre>
    </div>
  );
}
