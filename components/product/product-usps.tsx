"use client";
import { Product } from "@/lib/shopify/types";

export default function ProductUsps({ product }: { product: Product }) {
  const usps = JSON.parse(
    product.metafields.find((metafield) => metafield?.key === "usps")?.value ||
      "[]",
  );

  if (!usps.length) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-[4px]">
      {usps.map((usp: string) => (
        <li
          key={usp}
          className="text-body-xs ml-2x list-disc text-text-light-gray"
        >
          {usp}
        </li>
      ))}
    </ul>
  );
}
