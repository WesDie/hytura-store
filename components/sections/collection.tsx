"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductButton from "@/components/elements/product-button";

import { notFound } from "next/navigation";
import { Collection, Product } from "@/lib/shopify/types";

export default function MainCollection({
  collections,
  currentCollection,
}: {
  collections: Collection[];
  currentCollection: string;
}) {
  const router = useRouter();
  const [collectionName, setCollectionName] = useState(
    currentCollection[0].toUpperCase() +
      currentCollection.slice(1).toLowerCase(),
  );
  const [filteredCollection, setfilteredCollection] = useState(
    collections.filter(
      (collection: Collection) => collection.title === collectionName,
    ),
  );

  const changeCurrentCollection = (title: string) => () => {
    setfilteredCollection(
      collections.filter(
        (collection: Collection) => collection.title === title,
      ),
    );
    setCollectionName(title);
    router.push(`/collection/${title.toLowerCase()}`);
  };

  if (!filteredCollection.length) return notFound();

  return (
    <section className={`flex w-full flex-col`}>
      <div className="flex flex-col pt-4x md:pt-7x">
        <div className="flex flex-col gap-2x p-2x md:px-4x md:py-3x">
          <div className="flex">
            <h1 className="text-heading-lg md:text-heading-xl">
              {collectionName}
            </h1>
            <p className="text-heading-4xs">
              ({filteredCollection[0].products.length})
            </p>
          </div>
          {filteredCollection[0].description && (
            <p className="text-body-sm max-w-[450px]">
              {filteredCollection[0].description}
            </p>
          )}
        </div>
        <div className="flex gap-2x border-y border-solid border-stroke-gray p-1x px-2x py-2x md:px-4x">
          {collections.map((collection: Collection, index: number) => (
            <div
              key={index}
              onClick={changeCurrentCollection(collection.title)}
              className={`text-link-sm cursor-pointer ${collection.title === collectionName ? "text-text-black" : "text-text-light-gray"}`}
            >
              {collection.title}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {filteredCollection[0].products.map(
          (product: Product, index: number) => (
            <div
              key={index}
              className="h-full w-full border-b border-r border-stroke-gray"
            >
              <ProductButton product={product} />
            </div>
          ),
        )}
        {filteredCollection[0].products.length % 4 !== 0 &&
          Array.from({
            length: 4 - (filteredCollection[0].products.length % 4),
          }).map((_, index) => (
            <div
              key={index}
              className="h-full w-full border-b border-stroke-gray"
            ></div>
          ))}
      </div>
    </section>
  );
}
