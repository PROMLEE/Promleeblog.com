import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

export function imgtag({ src, alt }: ImageProps) {
  return <Image src={src} alt={alt} fill={true} />;
}
