import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

export function H1Icon({ className }: IconProps) {
  return (
    <svg
      className={cn(
        "h-[1.2em] w-[1.2em] shrink-0 -translate-y-[0.05em]",
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: "var(--icon-h1)" }}
    >
      {/* # 해시 기호 */}
      <path d="M10 4L8 20" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 4L14 20" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 9H20" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 15H20" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function H2Icon({ className }: IconProps) {
  return (
    <svg
      className={cn(
        "h-[1.2em] w-[1.2em] shrink-0 -translate-y-[0.05em]",
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: "var(--icon-h2)" }}
    >
      {/* 깃허브 잔디 그리드 - 우상향 그라데이션 느낌 */}
      <rect x="2" y="2" width="5" height="5" rx="1" opacity="0.2" />
      <rect x="9" y="2" width="5" height="5" rx="1" opacity="0.4" />
      <rect x="16" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" opacity="0.35" />
      <rect x="9" y="9" width="5" height="5" rx="1" opacity="0.8" />
      <rect x="16" y="9" width="5" height="5" rx="1" opacity="0.6" />
      <rect x="2" y="16" width="5" height="5" rx="1" opacity="0.7" />
      <rect x="9" y="16" width="5" height="5" rx="1" />
      <rect x="16" y="16" width="5" height="5" rx="1" opacity="0.25" />
    </svg>
  );
}

export function H3Icon({ className }: IconProps) {
  return (
    <svg
      className={cn(
        "h-[1.2em] w-[1.2em] shrink-0 -translate-y-[0.05em]",
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: "var(--icon-h3)" }}
    >
      {/* </> 코드 태그 */}
      <path
        d="M7 7L2 12L7 17"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 4L10 20" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M17 7L22 12L17 17"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function H4Icon({ className }: IconProps) {
  return (
    <svg
      className={cn(
        "h-[1.2em] w-[1.2em] shrink-0 -translate-y-[0.05em]",
        className,
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: "var(--icon-h4)" }}
    >
      {/* <_ 프롬프트 */}
      <path
        d="M4 7L11 14L4 21"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 19H22" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
