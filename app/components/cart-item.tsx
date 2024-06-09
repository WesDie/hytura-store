"use client";

import RenderImage from "./render-Image";
import { removeItem } from "./cart/actions";

export default function CartItem(itemData: any) {
  const item = itemData.itemData.node;
  const product = item.merchandise.product;

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
          <h3 className="text-heading-2xs">{product.title}</h3>
          <p className="text-body-sm text-text-light-gray">
            € {product.priceRange.maxVariantPrice.amount}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex w-[80px] border border-stroke-gray py-[2px]">
            <button className="text-body-sm w-full">-</button>
            <span className="text-body-sm w-full text-center">
              {item.quantity}
            </span>
            <button className="text-body-sm w-full">+</button>
          </div>
          <button className="text-link-sm" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
