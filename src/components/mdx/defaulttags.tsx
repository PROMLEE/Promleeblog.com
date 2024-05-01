import Image from "next/image";
import "katex/dist/katex.min.css";
import Link from "next/link";

interface Props {
  id: string;
  children: string;
  href: string;
}

export function imgtag({ src, alt }: { src: string; alt: string }) {
  const isWithlong = alt && alt.endsWith("w");
  if (isWithlong) {
    return (
      <div className="relative  h-[400px] m-0">
        <Image
          src={src}
          alt={alt}
          className="m-0"
          layout="fill"
          objectFit="contain"
        />
      </div>
    );
  } else {
    return (
      <div className="relative  h-[600px] m-0">
        <Image
          src={src}
          alt={alt}
          className="m-0"
          layout="fill"
          objectFit="contain"
        />
      </div>
    );
  }
}

export function h1tag({ id, children }: Props) {
  return (
    <>
      <hr
        className={
          "my-10 mx-auto border-1 rounded  w-full dark:border-slate-800"
        }
      />
      <div id={id} className="text-3xl font-bold ml-[-15px] mb-5">
        💡 {children}
      </div>
    </>
  );
}
export function h2tag({ id, children }: Props) {
  return (
    <div id={id} className="text-2xl font-bold ml-[-10px] mb-3">
      🚀 {children}
    </div>
  );
}
export function h3tag({ id, children }: Props) {
  return (
    <div id={id} className="text-xl font-bold ml-[-10px] mb-1">
      ✅ {children}
    </div>
  );
}
export function h4tag({ id, children }: Props) {
  return (
    <div id={id} className="text-lg font-bold mb-1">
      ▫️ {children}
    </div>
  );
}
export function h5tag({ id, children }: Props) {
  return (
    <div id={id} className="font-bold">
      {children}
    </div>
  );
}
export function h6tag({ id, children }: Props) {
  return (
    <div id={id} className="font-bold">
      {children}
    </div>
  );
}
export const oltag = ({ children }: Props) => {
  return <ol className="pb-2 pt-0 m-0">{children}</ol>;
};
export const ultag = ({ children }: Props) => {
  return <ul className="pb-2 pt-0 m-0">{children}</ul>;
};
export const litag = ({ id, children }: Props) => {
  return (
    <li id={id} className={"my-1"}>
      {children}
    </li>
  );
};
export const thtag = ({ children }: Props) => {
  return (
    <th className={"dark:text-white p-1 bg-slate-800 border-slate-500 border"}>
      {children}
    </th>
  );
};
export const tdtag = ({ children }: Props) => {
  return (
    <th className={"text-center font-normal border border-slate-700"}>
      {children}
    </th>
  );
};
// export const codetag = ({ children,  }: Props) => {
//   return <code className={"dark:text-white "}>{children}</code>;
// };
export const btag = ({ children }: Props) => {
  return <div className="font-bold">{children}</div>;
};

export function emtag({ children }: Props) {
  return (
    <div
      className={
        "inline decoration-wavy underline underline-offset-4 dark:decoration-yellow-400 decoration-yellow-800"
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
  return <div className={"leading-7 "}>{children}</div>;
};
export const spantag = ({ children }: Props) => {
  return <span className={""}>{children}</span>;
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
        className={"hover:text-blue-700  text-yellow-500 no-underline"}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      id={id}
      className={"hover:text-blue-700  text-yellow-500 no-underline"}
      href={href}
      target="_blank"
    >
      {children} ↗️
    </a>
  );
};
