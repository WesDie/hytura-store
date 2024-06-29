"use client";

import { useState } from "react";
import { addItem } from "./cart/actions";
import { Product, ProductVariant } from "@/lib/shopify/types";
import { useCartDrawer } from "./context/cart-drawer-context";
import Button from "@/components/elements/button";
import QuantitySelector from "./elements/quantity-selector";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [buyDisabled, setBuyDisabled] = useState(false);
  const { setIsCartOpen } = useCartDrawer();

  const addToCart = async () => {
    setBuyDisabled(true);
    await addItem(selectedVariant.id, quantity);
    setBuyDisabled(false);
    setIsCartOpen(true);
  };

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
          <Button
            text={`${!selectedVariant?.availableForSale ? "Sold out" : "Add to cart"}`}
            variant="primary"
            className="w-full"
            {...(buyDisabled || !selectedVariant?.availableForSale
              ? { disabled: true }
              : {})}
            onclick={() => addToCart()}
          />
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
