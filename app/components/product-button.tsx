// @ts-nocheck
"use client";
import RenderImage from "./render-Image";
import { useState, useRef } from "react";
import { addItem } from "./cart/actions";

export default function ProductButton(product: { product: any[] }) {
  const productItem = product.product;
  const [showSecondProductImage, setShowSecondProductImage] = useState(false);
  const videoRef = useRef(null);

  const productHoverToggle = (hover) => {
    if (product.product.media.edges[1]) {
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
    <div className="h-full w-full cursor-pointer bg-background-sand transition-colors">
      <div
        className="relative aspect-[29/27] w-full overflow-hidden md:aspect-[32/34]"
        onMouseEnter={() => productHoverToggle(true)}
        onMouseLeave={() => productHoverToggle(false)}
      >
        {productItem.images.edges.map((node: any, index: number) => (
          <RenderImage
            key={index}
            src={node.node.url}
            alt={"product image"}
            width={500}
            height={500}
            className={`absolute inset-0 block scale-[94%] object-cover ${
              showSecondProductImage ? "md:hidden" : ""
            }`}
            imageClassName="object-cover w-full h-full"
          />
        ))}
        <video
          autoPlay
          muted
          ref={videoRef}
          className={`absolute inset-0 hidden h-full ${
            showSecondProductImage ? "md:block" : ""
          }`}
        >
          <source
            src={`${
              productItem.media.edges[1]
                ? productItem.media.edges[1].node.sources[0].url
                : ""
            }`}
            className="h-full w-full object-cover"
          />
        </video>
      </div>
      <div className="flex justify-between p-2x">
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-1x">
            <h3 className="text-heading-2xs">{productItem.title}</h3>
            <p className="text-body-sm mt-auto leading-[21px] text-text-light-gray">
              € {productItem.priceRange.minVariantPrice.amount}
            </p>
          </div>
          <p className="text-body-xs text-text-light-gray">
            Spray | Bottle | Instructions
          </p>
        </div>
        <button
          className="text-body-sm my-auto h-[35px] border border-solid border-stroke-black bg-background-black px-2x text-text-white transition-colors hover:bg-transparent hover:text-text-black"
          onClick={() => addItem(productItem.variants.edges[0].node.id)}
        >
          Add
        </button>
      </div>
    </div>
  );
}
