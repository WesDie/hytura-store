"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/lib/shopify/types";
import Button from "@/components/elements/button";
import QuantitySelector from "./elements/quantity-selector";
import BuyButton from "./elements/buy-button";
import FaqItems from "./elements/faq-items";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const faqItems = [
    {
      question: "Description",
      answer: product.description
        ? product.description
        : "No description available",
    },
    {
      question: "Specifications",
      answer: "No specifications available",
    },
    {
      question: "Shipping",
      answer: "We deliver the next day",
    },
  ];

  return (
    <div className="sticky top-[53px] flex h-fit w-full flex-col py-2x md:w-[70%]">
      <div className="flex flex-col gap-3x border-b border-stroke-gray px-2x py-2x md:px-4x">
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
                <Button
                  key={variant.id}
                  text={variant.title}
                  variant={`${variant.id === selectedVariant.id ? "primary" : "secondary"}`}
                  onclick={() => setSelectedVariant(variant)}
                  className={`${variant.id === selectedVariant.id ? "pointer-events-none" : ""} ${variant.availableForSale ? "" : "opacity-50"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-1x">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <BuyButton selectedVariant={selectedVariant} quantity={quantity} />
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
      <div className="flex flex-col px-2x py-2x md:px-4x">
        <FaqItems
          firstOpen={true}
          faqItems={faqItems}
          topBottomBorders={false}
        />
      </div>
    </div>
  );
}
