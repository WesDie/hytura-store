"use client";

import RenderImage from "./render-Image";
import { removeItem, updateItemQuantity } from "./cart/actions";
import { CartItem } from "@/lib/shopify/types";

export default function CartItemProduct(item: CartItem) {
  const product = item.merchandise.product;

  const payloadPlus = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: item.quantity + 1,
  };
  const payloadMinus = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: item.quantity - 1,
  };

  return (
    <div className="flex h-[150px] w-full border-b border-stroke-gray md:h-[170px]">
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
              onClick={() => updateItemQuantity(payloadMinus)}
              className="text-body-sm w-full"
            >
              -
            </button>
            <span className="text-body-sm w-full text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateItemQuantity(payloadPlus)}
              className="text-body-sm w-full"
            >
              +
            </button>
          </div>
          <button className="text-link-sm" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
