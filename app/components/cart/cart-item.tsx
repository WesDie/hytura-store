"use client";

import RenderImage from "../render-Image";
import { removeItem, updateItemQuantity } from "./actions";
import { CartItem } from "@/lib/shopify/types";
import { useState, useEffect, useRef } from "react";

export default function CartItemProduct(item: CartItem) {
  const product = item.merchandise.product;
  const [isLoading, setIsLoading] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const quantityRef = useRef(item.quantity);
  const debounceTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const updateQuantity = (amount: number) => {
    const newQuantity = quantityRef.current + amount;
    if (newQuantity >= 0) {
      quantityRef.current = newQuantity;
      setLocalQuantity(newQuantity);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        await updateItemQuantity({
          lineId: item.id,
          variantId: item.merchandise.id,
          quantity: newQuantity,
        });
        setIsLoading(false);
        debounceTimeoutRef.current = null;
      }, 300);
    }
  };

  const remove = async () => {
    setIsLoading(true);
    await removeItem(item.id);
    setIsLoading(false);
  };

  useEffect(() => {
    quantityRef.current = item.quantity;
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div
      className={`flex h-[150px] w-full border-b border-stroke-gray md:h-[170px] ${isLoading && "pointer-events-none opacity-50"}`}
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
            {product.title} - {item.merchandise.title}
          </h3>
          <p className="text-body-sm text-text-light-gray">
            € {item.cost.totalAmount.amount}
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
            <span className="text-body-sm w-full text-center">
              {localQuantity}
            </span>
            <button
              onClick={() => updateQuantity(1)}
              className="text-body-sm w-full select-none"
            >
              +
            </button>
          </div>
          <button className="text-link-sm" onClick={() => remove()}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
