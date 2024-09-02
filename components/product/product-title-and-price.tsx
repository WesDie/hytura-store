"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import Price from "../elements/price";

export default function ProductTitleAndPrice({
  selectedVariant,
  product,
}: {
  selectedVariant: ProductVariant | undefined;
  product: Product;
}) {
  return (
    <>
      <div className="flex flex-col gap-1x">
        {product.options.length >= 1 && (
          <h3 className="text-body-md">
            {selectedVariant
              ? selectedVariant.title.replace("/", "-")
              : "Choose a variant"}
          </h3>
        )}
        <h1 className="text-heading-lg">{product.title}</h1>
      </div>
      <div className="text-body-lg">
        {selectedVariant ? (
          <Price
            productVariant={selectedVariant}
            priceClassName="!text-body-lg"
            discountClassName="!text-body-lg line-through text-text-light-gray"
          />
        ) : (
          "From € " + product.priceRange.minVariantPrice.amount
        )}
      </div>
    </>
  );
}
