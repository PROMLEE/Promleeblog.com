"use client";

import { Check, Clipboard } from "lucide-react";
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
          <Clipboard width={16} height={16} className="text-gray-500" />
        )}
      </button>
      <pre ref={preRef} {...props} className={"mt-0"}>
        {children}
      </pre>
    </div>
  );
}
