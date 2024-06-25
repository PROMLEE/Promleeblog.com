import Image from "next/image";
import "katex/dist/katex.min.css";
import Link from "next/link";
// import path from "path";
// import fs from "fs";
// import { getPlaiceholder } from "plaiceholder";

// const getImage = async (
//   src: string,
//   // getheight: number = 500,
//   // getwidth: number = 500,
// ) => {
//   let filePath;
//   let srcPath;
//   let buffer;
//   if (process.env.NEXT_PUBLIC_API_BASE_URL === "http://localhost:3000") {
//     srcPath = src;
//     filePath = path.resolve("./public", src.replace("/", ""));
//     buffer = fs.readFileSync(filePath);
//   } else {
//     filePath = `https://cdn.promleeblog.com${src}`;
//     srcPath = filePath;
//     buffer = await fetch(filePath).then(async (res) =>
//       Buffer.from(await res.arrayBuffer()),
//     );
//   }

//   const {
//     metadata: { height, width },
//     ...plaiceholder
//   } = await getPlaiceholder(buffer, { size: 10 });

//   return {
//     ...plaiceholder,
//     img: { src, height, width },
//     srcPath,
//   };
// };
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
  if (process.env.NEXT_PUBLIC_API_BASE_URL === "http://localhost:3000") {
    return (
      <Image
        src={src}
        alt={alt || "image"}
        className={`m-0 my-5 bg-${bg || "white"}`}
        width={Number(width) ? Number(width) : 500}
        height={Number(height) ? Number(height) : 500}
      />
    );
  }
  return (
    <Image
      src={`https://cdn.promleeblog.com/posts${src}`}
      alt={alt || "image"}
      className={`m-0 my-5 bg-${bg || "white"}`}
      width={Number(width) ? Number(width) : 500}
      height={Number(height) ? Number(height) : 500}
      // placeholder="blur"
      // blurDataURL={base64}
    />
  );
  // } catch {
  //   console.log("error");
  //   return (
  //     <Image
  //       src={`https://cdn.promleeblog.com${src}`}
  //       alt={alt || "image"}
  //       className={`m-0 my-5 bg-${bg || "white"}`}
  //       width={Number(width) ? Number(width) : 500}
  //       height={Number(height) ? Number(height) : 500}
  //     />
  //   );
  // }
}

export function h1tag({ id, children }: Props) {
  return (
    <>
      <hr
        className={"mx-auto my-10 w-full rounded border-2 border-foreground"}
      />
      <div id={id} className="mb-5 ml-[-15px] mt-14 flex gap-2 text-3xl">
        💡 <h1 className="m-0 text-3xl font-bold">{children}</h1>
      </div>
    </>
  );
}
export function h2tag({ id, children }: Props) {
  return (
    <>
      <hr className={"border-1 w-full rounded border-foreground"} />
      <div id={id} className="mb-3 ml-[-10px] mt-5 flex gap-2 text-2xl">
        🚀 <h2 className="m-0 text-2xl font-bold">{children}</h2>
      </div>
    </>
  );
}
export function h3tag({ id, children }: Props) {
  return (
    <div id={id} className="mb-2 ml-[-10px] mt-7 flex gap-2 text-xl font-bold">
      ✅ <h3 className="m-0 text-xl font-bold">{children}</h3>
    </div>
  );
}
export function h4tag({ id, children }: Props) {
  return (
    <div id={id} className="mb-1 ml-[-8px] mt-7 flex gap-2">
      ➡️ <h4 className="m-0 text-lg font-bold">{children}</h4>
    </div>
  );
}
export function h5tag({ id, children }: Props) {
  return (
    <div id={id} className="flex gap-2">
      <div className="m-0 font-bold">{children}</div>
    </div>
  );
}
export function h6tag({ id, children }: Props) {
  return (
    <div id={id} className="flex gap-2">
      <div className="m-0 font-bold">{children}</div>
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
    <li id={id} className=" marker:text-text">
      {children}
    </li>
  );
};
export const thtag = ({ children }: Props) => {
  return (
    <th
      className={
        "border border-third bg-foreground p-1 font-normal text-text-foreground"
      }
    >
      {children}
    </th>
  );
};
export const tdtag = ({ children }: Props) => {
  return (
    <th className={"border border-third text-center font-normal"}>
      {children}
    </th>
  );
};
// export const codetag = ({ children,  }: Props) => {
//   return <code className={"dark:text-white "}>{children}</code>;
// };
export const btag = ({ children }: Props) => {
  return (
    <div className="inline font-bold text-text-foreground">{children}</div>
  );
};

export function emtag({ children }: Props) {
  return (
    <div
      className={
        "inline text-text-foreground underline decoration-yellow-800 decoration-wavy underline-offset-[0.2rem] dark:decoration-yellow-400"
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
          "font-bold text-yellow-700 no-underline hover:text-blue-700 dark:font-normal dark:text-yellow-500 hover:dark:text-blue-300"
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
        "font-bold text-yellow-700 no-underline hover:text-blue-700 dark:font-normal dark:text-yellow-500 hover:dark:text-blue-300"
      }
      href={href}
      target="_blank"
    >
      {children}↗
    </a>
  );
};
