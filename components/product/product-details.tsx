"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/lib/shopify/types";
import { VariantSwitcher } from "./variant-switcher";
import QuantitySelector from "../elements/quantity-selector";
import BuyButton from "../elements/buy-button";
import FaqItems from "../elements/faq-items";
import ProductTitleAndPrice from "./product-title-and-price";
import ProductUsps from "./product-usps";
import { useSearchParams } from "next/navigation";

export default function ProductDetails({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const findSelectedVariant = useCallback(() => {
    if (product.variants.length === 1) {
      return product.variants[0];
    }

    return product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) =>
          searchParams.get(option.name.toLowerCase()) === option.value,
      ),
    );
  }, [product.variants, searchParams]);

  const [selectedVariant, setSelectedVariant] = useState(findSelectedVariant());

  useEffect(() => {
    setSelectedVariant(findSelectedVariant());
  }, [findSelectedVariant, searchParams]);

  const faqItems = [
    {
      question: "Description",
      answer: product.description
        ? product.description
        : "No description available",
    },
    {
      question: "Specifications",
      answer:
        product.metafields.find(
          (metafield) => metafield?.key === "specifications",
        )?.value || "No specifications available",
    },
  ];

  return (
    <div className="sticky top-[53px] flex h-fit w-full flex-col py-2x md:w-[70%]">
      <div className="flex flex-col gap-3x border-b border-stroke-gray px-2x py-2x md:px-4x">
        <div className="flex flex-col gap-2x">
          <ProductTitleAndPrice
            product={product}
            selectedVariant={selectedVariant}
          />
          <VariantSwitcher
            options={product.options}
            variants={product.variants}
          />
        </div>
        <div className="flex w-full gap-1x">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <BuyButton selectedVariant={selectedVariant} quantity={quantity} />
        </div>
        <ProductUsps product={product} />
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
