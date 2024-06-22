"use client";
import RenderImage from "./render-Image";
import { useState, useRef } from "react";
import { addItem } from "./cart/actions";
import Link from "next/link";
import { Product } from "@/lib/shopify/types";
import { useCartDrawer } from "../context/cart-drawer-context";

export default function ProductButton({ product }: { product: Product }) {
  const [showSecondProductImage, setShowSecondProductImage] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buyBtn = useRef<HTMLButtonElement | null>(null);
  const { setIsCartOpen } = useCartDrawer();

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

  const quickAdd = async () => {
    if (buyBtn.current) {
      buyBtn.current.disabled = true;
      await addItem(product.variants[0].id);
      buyBtn.current.disabled = false;
      setIsCartOpen(true);
    }
  };

  if (!product) return null;

  return (
    <div className="h-full w-full bg-background-sand transition-colors">
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
          autoPlay
          muted
          ref={videoRef}
          className={`pointer-events-none absolute inset-0 hidden h-full ${
            showSecondProductImage ? "md:block" : ""
          }`}
        >
          <source
            src={`${product.media[1]?.sources !== undefined ? product.media[1].sources[0].url : ""}`}
            className="h-full w-full object-cover"
          />
        </video>
      </Link>
      <div className="flex justify-between p-2x">
        <Link
          className="flex cursor-pointer flex-col gap-[4px]"
          href={"/product/" + product.handle}
        >
          <div className="flex gap-1x">
            <h3 className="text-heading-2xs">{product.title}</h3>
            <p className="text-body-sm mt-auto leading-[21px] text-text-light-gray">
              € {product.priceRange.minVariantPrice.amount}
            </p>
          </div>
          <p className="text-body-xs text-text-light-gray">
            Spray | Bottle | Instructions
          </p>
        </Link>
        <button
          className="button-primary h-fit"
          onClick={() => quickAdd()}
          {...(product.variants[0].availableForSale ? {} : { disabled: true })}
          ref={buyBtn}
        >
          Add
        </button>
      </div>
    </div>
  );
}
