"use client";

import RenderImage from "@/components/utilities/render-Image";
import { removeItem, updateItemQuantity } from "./actions";
import { CartItem } from "@/lib/shopify/types";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/elements/button";

export default function CartItemProduct(item: CartItem) {
  const product = item.merchandise.product;
  const [isLoading, setIsLoading] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const quantityRef = useRef(item.quantity);
  const debounceTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const updateQuantity = (amount: number, newValue?: number) => {
    let newQuantity = quantityRef.current + amount;
    if (newValue) {
      newQuantity = newValue;
    }

    if (newQuantity >= 0 && newQuantity <= 99) {
      quantityRef.current = newQuantity;
      setLocalQuantity(newQuantity);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (newQuantity === 0) {
        remove();
        return;
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        const res = await updateItemQuantity({
          lineId: item.id,
          variantId: item.merchandise.id,
          quantity: newQuantity,
        });

        if (typeof res !== "string" && res !== undefined) {
          setLocalQuantity(res.quantity);
          quantityRef.current = res.quantity;
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 100);
        debounceTimeoutRef.current = null;
      }, 300);
    }
  };

  const remove = async () => {
    setIsLoading(true);
    await removeItem(item.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 99) {
      updateQuantity(0, 99);
    } else {
      updateQuantity(0, newQuantity);
    }
  };

  useEffect(() => {
    quantityRef.current = item.quantity;
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div
      className={`min-h- flex h-[150px] w-full border-b border-stroke-gray md:h-[170px] ${isLoading && "pointer-events-none opacity-50"}`}
    >
      {product?.featuredImage?.url ? (
        <RenderImage
          src={product.featuredImage.url}
          alt={"product item image"}
          width={150}
          height={170}
          className="h-full min-w-[150px] border-r border-stroke-gray"
          imageClassName="object-cover w-full h-full"
        />
      ) : (
        <div className="h-full min-w-[150px] border-r border-stroke-gray"></div>
      )}
      <div className="flex w-full flex-col justify-between p-2x">
        <div className="flex flex-col">
          <h3 className="text-heading-2xs">
            {product.title} - {item.merchandise.title.replace("/", "-")}
          </h3>
          <p className="text-body-sm text-text-light-gray">
            €{" "}
            {(
              Number(item.merchandise.price.amount) * Number(localQuantity)
            ).toFixed(2)}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex w-[80px] border border-stroke-gray py-[2px]">
            <button
              onClick={() => updateQuantity(-1)}
              className="text-body-sm w-full select-none"
            >
              -
            </button>
            <input
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="text-body-sm w-full bg-transparent text-center focus-within:outline-none"
              {...(isLoading && { disabled: true })}
              value={localQuantity}
            />
            <button
              onClick={() => updateQuantity(1)}
              className="text-body-sm w-full select-none"
            >
              +
            </button>
          </div>
          <Button text="Remove" variant="link" onclick={() => remove()} />
        </div>
      </div>
    </div>
  );
}
