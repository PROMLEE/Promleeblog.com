import Image from "next/image";
import "katex/dist/katex.min.css";
interface ImageProps {
  src: string;
  alt: string;
}

export function imgtag({ src, alt }: ImageProps) {
  return <Image src={src} alt={alt} fill={true} />;
}
export function h1tag({ children }: any) {
  return <div className="text-5xl font-bold my-5">{children}</div>;
}
export function h2tag({ children }: any) {
  return <div className="text-4xl font-bold my-4">{children}</div>;
}
export function h3tag({ children }: any) {
  return <div className="text-3xl font-bold mt-20 mb-5">💡 {children}</div>;
}
export function h4tag({ children }: any) {
  return <div className="text-2xl font-bold mt-10 mb-3">⭐ {children}</div>;
}
export function h5tag({ children }: any) {
  return <div className="text-xl font-bold my-1">▫️{children}</div>;
}
export const oltag = ({ children }: any) => {
  return <ol className={""}>{children}</ol>;
};

export const litag = ({ children }: any) => {
  return <li className={""}>{children}</li>;
};
export const btag = ({ children }: any) => {
  return <div className={"font-bold"}>{children}</div>;
};

export const ptag = ({ children }: any) => {
  return <p className={""}>{children}</p>;
};
export const spantag = ({ children }: any) => {
  return <span className={""}>{children}</span>;
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