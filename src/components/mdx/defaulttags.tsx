import Image from "next/image";
import "katex/dist/katex.min.css";
interface ImageProps {
  src: string;
  alt: string;
}

export function imgtag({ src, alt }: ImageProps) {
  return (
    <Image src={src} alt={alt} className="m-0" width={1000} height={400} />
  );
}
export function h1tag({ id, children }: any) {
  return (
    <div id={id} className="text-4xl font-bold mt-20 mb-5">
      💡 {children}
    </div>
  );
}
export function h2tag({ id, children }: any) {
  return (
    <div id={id} className="text-3xl font-bold  mt-10 mb-3">
      🚀 {children}
    </div>
  );
}
export function h3tag({ id, children }: any) {
  return (
    <div id={id} className="text-2xl font-bold mt-5 mb-2">
      ▫️ {children}
    </div>
  );
}
export function h4tag({ id, children }: any) {
  return (
    <div id={id} className="text-1xl font-bold">
      {children}
    </div>
  );
}
export function h5tag({ id, children }: any) {
  return (
    <div id={id} className="text-xl font-bold">
      {children}
    </div>
  );
}
export function h6tag({ id, children }: any) {
  return (
    <div id={id} className="font-bold my-1">
      ▫️{children}
    </div>
  );
}
export const oltag = ({ children }: any) => {
  return <ol className={"my-0"}>{children}</ol>;
};
export const ultag = ({ children }: any) => {
  return <ul className={"my-0"}>{children}</ul>;
};
export const litag = ({ children }: any) => {
  return <li className={"my-0"}>{children}</li>;
};
export const btag = ({ children }: any) => {
  return <div className={"font-bold inline"}>{children}</div>;
};

export const ptag = ({ children }: any) => {
  return <div className={""}>{children}</div>;
};
export const spantag = ({ children }: any) => {
  return <span className={""}>{children}</span>;
};
export const blockquotetag = ({ children }: any) => {
  return (
    <blockquote className={"my-2 bg-slate-800 ml-2"}>{children}</blockquote>
  );
};
export const atag = ({ children, href }: any) => {
  return (
    <a
      className={" hover:text-blue-700"}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
