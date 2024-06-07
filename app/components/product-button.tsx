// @ts-nocheck
"use client";
import RenderImage from "./render-Image";
import { useState, useRef } from "react";

export default function ProductButton(product: { product: any[] }) {
  const productItem = product.product;
  const [showSecondProductImage, setShowSecondProductImage] = useState(false);
  const videoRef = useRef(null);

  const productHoverToggle = (hover) => {
    if (product.product.media.nodes[1]) {
      setShowSecondProductImage(hover);
      if (hover) {
        videoRef.current.play();
        videoRef.current.currentTime = 0;
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="w-full h-full cursor-pointer transition-colors bg-background-sand">
      <div
        className="aspect-[29/27] md:aspect-[32/34] w-full overflow-hidden relative"
        onMouseEnter={() => productHoverToggle(true)}
        onMouseLeave={() => productHoverToggle(false)}
      >
        {productItem.images.nodes.map((node: any) => (
          <RenderImage
            key={node.id}
            src={node.url}
            alt={"product image"}
            width={500}
            height={500}
            className={`absolute inset-0 object-cover scale-[94%] block ${
              showSecondProductImage ? "md:hidden" : ""
            }`}
            imageClassName="object-cover w-full h-full"
          />
        ))}
        <video
          autoPlay
          muted
          ref={videoRef}
          className={`absolute inset-0 h-full hidden ${
            showSecondProductImage ? "md:block" : ""
          }`}
        >
          <source
            src={`${
              product.product.media.nodes[1]
                ? product.product.media.nodes[1].sources[0].url
                : ""
            }`}
            className="object-cover w-full h-full"
          />
        </video>
      </div>
      <div className="flex justify-between p-2x">
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-1x">
            <h3 className="text-heading-2xs">{productItem.title}</h3>
            <p className="text-body-sm leading-[21px] mt-auto text-text-light-gray">
              € {productItem.priceRange.minVariantPrice.amount}
            </p>
          </div>
          <p className=" text-body-xs text-text-light-gray">
            Spray | Bottle | Instructions
          </p>
        </div>
        <button className="bg-background-black h-[35px] px-2x border border-solid border-stroke-black text-body-sm text-text-white hover:bg-transparent hover:text-text-black transition-colors my-auto">
          Add
        </button>
      </div>
    </div>
  );
}
