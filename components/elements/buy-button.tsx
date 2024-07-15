"use client";
import Button from "./button";
import { ProductVariant } from "@/lib/shopify/types";
import { addItem } from "../cart/actions";
import { useCartDrawer } from "../context/cart-drawer-context";
import { useState } from "react";

export default function BuyButton({
  selectedVariant,
  quantity,
  text,
  className,
}: {
  selectedVariant: ProductVariant;
  quantity: number;
  text?: string;
  className?: string;
}) {
  const [buyDisabled, setBuyDisabled] = useState(false);
  const { setIsCartOpen } = useCartDrawer();

  const addToCart = async () => {
    setBuyDisabled(true);
    await addItem(selectedVariant.id, quantity);
    setTimeout(() => {
      setBuyDisabled(false);
      setIsCartOpen(true);
    }, 200);
  };

  return (
    <Button
      text={`${text ? text : !selectedVariant?.availableForSale ? "Sold out" : "Add to cart"}`}
      variant="primary"
      className={`${className ? className : "w-full"}`}
      {...(buyDisabled || !selectedVariant?.availableForSale
        ? { disabled: true }
        : {})}
      onclick={() => addToCart()}
    />
  );
}
