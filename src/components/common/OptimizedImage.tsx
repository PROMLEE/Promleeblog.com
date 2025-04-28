"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useImageLoaded } from "@/lib/client-hooks";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  blurDataURL,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [, error] = useImageLoaded(imgSrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
  }, [src]);

  // cdn.promleeblog.com 이미지는 이미 최적화되어 있으므로 표준 Image 컴포넌트 사용
  const isCdnImage = imgSrc.includes("cdn.promleeblog.com");

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        priority={priority}
        quality={quality}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          // 오류 시 기본 이미지로 대체
          if (imgSrc !== "/icons/placeholder.png") {
            setImgSrc("/icons/placeholder.png");
          }
        }}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        // CDN 이미지는 이미 WebP 최적화되어 있으므로 다른 설정 적용
        {...(isCdnImage
          ? { unoptimized: true }
          : {
              sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
            })}
      />

      {error && imgSrc === "/icons/placeholder.png" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          이미지를 불러올 수 없습니다
        </div>
      )}
    </div>
  );
}
