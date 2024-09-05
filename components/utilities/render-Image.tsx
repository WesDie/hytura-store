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

  if (!src) return null;

  return (
    <div
      className={`${className ? className : ""} overflow-hidden`}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => {
          setImageLoading(false);
        }}
        className={`${
          isImageLoading ? "blur-[20px]" : "remove-blur"
        } ${imageClassName ? imageClassName : ""}`}
      ></Image>
    </div>
  );
}
