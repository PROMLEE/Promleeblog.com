import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

export function imgtag({ src, alt }: ImageProps) {
  return <Image src={src} alt={alt} fill={true} />;
}
export function h1tag({ children }: any) {
  return <div className="text-5xl font-bold text-white">{children}</div>;
}
export function h2tag({ children }: any) {
  return <div className="text-4xl font-bold text-white">{children}</div>;
}
export function h3tag({ children }: any) {
  return <div className="text-3xl font-bold text-white">{children}</div>;
}
export function h4tag({ children }: any) {
  return <div className="text-2xl font-bold text-white">{children}</div>;
}
export function h5tag({ children }: any) {
  return <div className="text-xl font-bold text-white">{children}</div>;
}
export const oltag = ({ children }: any) => {
  return <ol className={"marker:text-white text-white"}>{children}</ol>;
};

export const litag = ({ children }: any) => {
  return <li className={"text-white"}>{children}</li>;
};
export const btag = ({ children }: any) => {
  return <b className={"font-bold text-white"}>{children}</b>;
};

export const ptag = ({ children }: any) => {
  return <p className={" text-white"}>{children}</p>;
};
export const spantag = ({ children }: any) => {
  return <span className={" text-white"}>{children}</span>;
};
export const atag = ({ children, href }: any) => {
  return (
    <a
      className={"text-white hover:text-blue-700"}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
