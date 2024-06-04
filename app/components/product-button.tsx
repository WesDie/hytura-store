// @ts-nocheck
"use client";
import Image from "next/image";

export default function ProductButton(product: { product: any[] }) {
  const productItem = product.product;

  return (
    <div className="w-full h-full">
      {productItem.images.nodes.map((node: any) => (
        <Image
          key={node.id}
          src={node.url}
          alt={"product image"}
          width={500}
          height={500}
          className="aspect-[32/34] w-full object-cover"
        ></Image>
      ))}
      <div className="flex justify-between p-2x">
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-1x">
            <h3 className="text-heading-2xs">{productItem.title}</h3>
            <p className="text-body-sm leading-[21px] mt-auto text-text-light-gray">
              € {productItem.priceRange.minVariantPrice.amount}
            </p>
          </div>
          <p className=" text-body-xs text-text-light-gray">
            Spray | Bottle | Instructions
          </p>
        </div>
        <button className="bg-background-black h-[35px] px-2x text-body-sm text-text-white hover:bg-black transition-colors my-auto">
          Add
        </button>
      </div>
    </div>
  );
}
