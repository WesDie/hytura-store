"use client";
import Image from "next/image";
import { useState } from "react";

export default function RenderImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  onClick,
  quality = 75,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  quality?: number;
  priority?: boolean;
}) {
  const [isLoading, setLoading] = useState(true);

  // Don't show loading state for SVGs
  const shouldShowLoadingState = !src?.endsWith(".svg");

  // Generate low quality placeholder URL
  const placeholderUrl = shouldShowLoadingState
    ? `${src}?width=50&quality=30`
    : src;

  if (!src) return null;

  return (
    <div className={`${className || ""} overflow-hidden`} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        onLoad={() => setLoading(false)}
        placeholder={shouldShowLoadingState ? "blur" : "empty"}
        blurDataURL={placeholderUrl}
        className={`duration-700 ease-in-out ${isLoading ? "scale-110 blur-md grayscale" : "scale-100 blur-0 grayscale-0"} ${imageClassName || ""} `}
      />
    </div>
  );
}
