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
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
}) {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setImageLoading(false)}
        className={`${
          isImageLoading ? "blur-sm" : "remove-blur"
        } ${imageClassName}`}
      ></Image>
    </div>
  );
}
