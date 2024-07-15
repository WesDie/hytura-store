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
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}) {
  const [isImageLoading, setImageLoading] = useState(!src.endsWith(".svg"));
  const [isImageLoaded, setImageLoaded] = useState(false);

  if (!src) return null;

  return (
    <div className={`${className} overflow-hidden`} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => {
          setImageLoading(false);
          setImageLoaded(true);
        }}
        className={`${
          isImageLoading ? "blur-[20px]" : "remove-blur"
        } ${imageClassName}`}
      ></Image>
    </div>
  );
}
