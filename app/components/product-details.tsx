"use client";

import { useState } from "react";
import { addItem } from "./cart/actions";
import { Product, ProductVariant } from "@/lib/shopify/types";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="sticky top-[53px] flex h-fit w-[50%] flex-col py-2x">
      <div className="flex flex-col gap-3x border-b border-stroke-gray px-4x py-2x">
        <div className="flex flex-col gap-2x">
          <div className="flex flex-col gap-1x">
            <h3 className="text-body-md">Bottle of {selectedVariant.title}</h3>
            <h1 className="text-heading-lg">{product.title}</h1>
          </div>
          <p className="text-body-lg">€ {selectedVariant.price.amount}</p>
          <div className="flex flex-col gap-1x">
            <p className="text-body-sm">Size:</p>
            <div className="flex gap-1x">
              {product.variants.map((variant: ProductVariant) => (
                <button
                  key={variant.id}
                  className={`${variant.id === selectedVariant.id ? "button-primary pointer-events-none" : "button-secondary"}`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-1x">
          <div className="flex w-[80px] border border-stroke-gray py-[2px]">
            <button
              onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
              className="text-body-sm w-full"
            >
              -
            </button>
            <span className="text-body-sm my-auto h-fit w-full text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-body-sm w-full"
            >
              +
            </button>
          </div>
          <button
            className="button-primary w-full"
            onClick={() => addItem(selectedVariant.id, quantity)}
          >
            Add to cart
          </button>
        </div>
        <ul className="flex flex-col gap-[4px]">
          <li className="text-body-xs ml-2x list-disc text-text-light-gray">
            Delivered the next day
          </li>
          <li className="text-body-xs ml-2x list-disc text-text-light-gray">
            Happy plants
          </li>
        </ul>
      </div>
      <div className="flex px-4x py-2x"></div>
    </div>
  );
}
