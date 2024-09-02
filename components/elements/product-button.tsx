"use client";
import RenderImage from "../utilities/render-Image";
import { useState, useRef } from "react";
import Link from "next/link";
import { Product } from "@/lib/shopify/types";
import BuyButton from "./buy-button";
import Price from "./price";

export default function ProductButton({ product }: { product: Product }) {
  const [showSecondProductImage, setShowSecondProductImage] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const productHoverToggle = (hover: boolean) => {
    if (product.media[1]?.sources && videoRef.current) {
      setShowSecondProductImage(hover);
      if (hover) {
        videoRef.current.play();
        videoRef.current.currentTime = 0;
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (!product) return null;

  const videoSrc = product.media[1]?.sources?.find((source) =>
    source.url.endsWith(".mp4"),
  );
  const videoUrl = videoSrc ? videoSrc.url : "";

  const productFeatures = JSON.parse(
    product.metafields.find((metafield) => metafield?.key === "features")
      ?.value || "[]",
  );

  return (
    <div className="flex h-full w-full flex-col bg-background-sand transition-colors">
      <Link
        href={"/product/" + product.handle}
        className="relative flex aspect-[29/27] w-full cursor-pointer overflow-hidden md:aspect-[32/34]"
        onMouseEnter={() => productHoverToggle(true)}
        onMouseLeave={() => productHoverToggle(false)}
      >
        {product.featuredImage && (
          <RenderImage
            src={product.featuredImage.url}
            alt={"product image"}
            width={500}
            height={500}
            className={`absolute inset-0 block scale-[94%] object-cover ${
              showSecondProductImage ? "md:hidden" : ""
            }`}
            imageClassName="object-cover w-full h-full"
          />
        )}
        <video
          muted
          ref={videoRef}
          className={`pointer-events-none absolute inset-0 hidden h-full ${
            showSecondProductImage ? "md:block" : ""
          }`}
        >
          <source src={`${videoUrl}`} className="h-full w-full object-cover" />
        </video>
      </Link>
      <div className="mt-0 flex max-w-full flex-row justify-between gap-0 overflow-hidden p-2x md:mt-auto md:flex-col md:gap-1x xl:mt-0 xl:flex-row xl:gap-0">
        <Link
          className="flex max-w-full cursor-pointer flex-col justify-center gap-[4px] overflow-hidden"
          href={"/product/" + product.handle}
        >
          <div className="flex gap-1x">
            <h3 className="text-heading-2xs max-w-full overflow-hidden text-ellipsis text-nowrap">
              {product.title}
            </h3>
            <Price
              productVariant={product.variants[0]}
              className="text-nowrap"
            />
          </div>
          {productFeatures.length > 0 && (
            <p className="text-body-xs overflow-hidden text-ellipsis text-nowrap text-text-light-gray">
              {productFeatures.map((include: string, index: number) => (
                <span key={include}>
                  {include}
                  {index !== productFeatures.length - 1 ? " | " : ""}
                </span>
              ))}
            </p>
          )}
        </Link>
        <BuyButton
          selectedVariant={product.variants[0]}
          quantity={1}
          text="Add"
          className="my-auto h-fit w-fit md:w-full xl:w-fit"
        />
      </div>
    </div>
  );
}
