import { Image, Product } from "@/lib/shopify/types";
import RenderImage from "./render-Image";

export default function ProductMedia({ product }: { product: Product }) {
  return (
    <div className="flex w-full flex-col border-r border-stroke-gray">
      <div className="flex">
        {product.images.slice(0, 1).map((image: Image, index: number) => (
          <RenderImage
            key={index}
            src={image.url}
            alt={"product image"}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            imageClassName="object-cover w-full h-full"
          />
        ))}
        <div className="flex w-full flex-col">
          {product.images.slice(1, 3).map((image: Image, index: number) => (
            <RenderImage
              key={index}
              src={image.url}
              alt={"product image"}
              width={500}
              height={500}
              className="h-[350px] w-full object-cover"
              imageClassName="object-cover w-full h-full"
            />
          ))}
        </div>
      </div>
      {product.images.slice(3).map((image: Image, index: number) => (
        <RenderImage
          key={index}
          src={image.url}
          alt={"product image"}
          width={500}
          height={500}
          className="h-[450px] w-full object-cover"
          imageClassName="object-cover w-full h-full"
        />
      ))}
    </div>
  );
}
