import Image from "next/image";
import "katex/dist/katex.min.css";
import Link from "next/link";
import { CopyButton } from "../buttons/CopyButton";
import { DevImageUrl, ImageUrl } from "@/lib/PostUtils/getImageUrl";

interface Props {
  id: string;
  children: string;
  href: string;
}

export async function Img({
  src,
  alt,
  height,
  width,
  bg,
}: {
  src: string;
  alt: string;
  height: string;
  width: string;
  bg: string;
}) {
  return (
    <div className="my-5 flex flex-col items-center">
      <Image
        src={ImageUrl(src)}
        alt={alt || "image"}
        className={`m-0 my-5 bg-${bg || "white"}`}
        width={Number(width) ? Number(width) : 500}
        height={Number(height) ? Number(height) : 500}
      />
      <div className="mt-2 text-sm">{alt}</div>
    </div>
  );
}

export async function DevImg({
  src,
  alt,
  height,
  width,
  bg,
}: {
  src: string;
  alt: string;
  height: string;
  width: string;
  bg: string;
}) {
  return (
    <div className="my-5 flex flex-col items-center">
      <Image
        src={await DevImageUrl(src)}
        alt={alt || "image"}
        className={`m-0 my-5 bg-${bg || "white"}`}
        width={Number(width) ? Number(width) : 500}
        height={Number(height) ? Number(height) : 500}
      />
      <div className="mt-2 text-sm">{alt}</div>
    </div>
  );
}
export function h1tag({ id, children }: Props) {
  return (
    <>
      <hr
        className={"border-foreground mx-auto my-10 w-full rounded border-2"}
      />
      <div className="mt-14 mb-5 ml-[-15px] flex gap-2 text-3xl">
        💡{" "}
        <h1
          id={id}
          className="not-prose text-text-foreground m-0 text-3xl font-bold"
        >
          {children}
        </h1>
      </div>
    </>
  );
}
export function h2tag({ id, children }: Props) {
  return (
    <>
      <hr className={"border-foreground w-full rounded border-1"} />
      <div className="mt-5 mb-3 ml-[-10px] flex gap-2 text-2xl">
        <div>🚀 </div>
        <h2
          id={id}
          className="not-prose text-text-foreground m-0 text-2xl font-bold"
        >
          {children}
        </h2>
      </div>
    </>
  );
}
export function h3tag({ id, children }: Props) {
  return (
    <div className="mt-7 mb-2 ml-[-10px] flex gap-2 text-xl font-bold">
      ✅{" "}
      <h3
        id={id}
        className="not-prose text-text-foreground m-0 text-xl font-bold"
      >
        {children}
      </h3>
    </div>
  );
}
export function h4tag({ id, children }: Props) {
  return (
    <div className="mt-7 mb-1 ml-[-8px] flex gap-2">
      ➡️{" "}
      <h4
        id={id}
        className="not-prose text-text-foreground m-0 text-lg font-bold"
      >
        {children}
      </h4>
    </div>
  );
}
export function h5tag({ id, children }: Props) {
  return (
    <div className="flex gap-2">
      <h5 id={id} className="not-prose text-text-foreground m-0 font-bold">
        {children}
      </h5>
    </div>
  );
}
export function h6tag({ id, children }: Props) {
  return (
    <div className="flex gap-2">
      <h6 id={id} className="not-prose text-text-foreground m-0 font-bold">
        {children}
      </h6>
    </div>
  );
}
export const oltag = ({ children }: Props) => {
  return <ol className="m-0">{children}</ol>;
};
export const ultag = ({ children }: Props) => {
  return <ul className="m-0">{children}</ul>;
};
export const litag = ({ id, children }: Props) => {
  return (
    <li id={id} className="marker:text-text">
      {children}
    </li>
  );
};
export const thtag = ({ children }: Props) => {
  return (
    <th
      className={
        "border-third bg-foreground text-text-foreground border p-1 text-center font-normal"
      }
    >
      {children}
    </th>
  );
};
export const tdtag = ({ children }: Props) => {
  return (
    <th className={"border-third border text-center font-normal"}>
      {children}
    </th>
  );
};
// export const codetag = ({ children,  }: Props) => {
//   return <code className={"dark:text-white dark:text-black "}>{children}</code>;
// };
export const btag = ({ children }: Props) => {
  return (
    <div className="text-text-foreground inline font-bold">{children}</div>
  );
};

export function emtag({ children }: Props) {
  return (
    <div
      className={
        "text-text-foreground inline underline decoration-yellow-800 decoration-wavy underline-offset-[0.2rem] dark:decoration-yellow-400"
      }
    >
      {children}
    </div>
  );
}

export const brtag = () => {
  return <div className="h-3" />;
};
export const ptag = ({ children }: Props) => {
  return <div className={"leading-7"}>{children}</div>;
};
export const spantag = ({ children }: Props) => {
  return <span>{children}</span>;
};
// export const blockquotetag = ({ children }: Props) => {
//   return (
//     <blockquote className={"my-2 dark:bg-slate-600 ml-2"}>
//       {children}
//     </blockquote>
//   );
// };
export const atag = ({ id, children, href }: Props) => {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        href={href}
        id={id}
        className={
          "font-bold text-yellow-700 no-underline hover:text-blue-700 dark:font-normal dark:text-yellow-500 dark:hover:text-blue-300"
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      id={id}
      className={
        "font-bold text-yellow-700 no-underline hover:text-blue-700 dark:font-normal dark:text-yellow-500 dark:hover:text-blue-300"
      }
      href={href}
      target="_blank"
    >
      {children}↗
    </a>
  );
};

export const codetag = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="text-text relative font-extralight">
      <span className="absolute top-0 right-0">
        <CopyButton>{children}</CopyButton>
      </span>
      {children}
    </code>
  );
};

