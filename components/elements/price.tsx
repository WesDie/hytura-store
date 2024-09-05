"use client";
import { ProductVariant } from "@/lib/shopify/types";

export default function Price({
  productVariant,
  className = "",
  priceClassName = "",
  discountClassName = "",
}: {
  productVariant: ProductVariant;
  className?: string;
  priceClassName?: string;
  discountClassName?: string;
}) {
  return (
    <div className={`flex gap-1x ${className ? className : ""}`}>
      <p
        className={`${priceClassName ? priceClassName : "text-body-sm mt-auto leading-[21px] text-text-light-gray"}`}
      >
        € {productVariant.price.amount}
      </p>
      {productVariant.compareAtPrice && (
        <p
          className={`${discountClassName ? discountClassName : "text-body-sm mt-auto leading-[21px] text-text-light-gray line-through"}`}
        >
          € {productVariant.compareAtPrice.amount}
        </p>
      )}
    </div>
  );
}
