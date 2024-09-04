import { Image, Product } from "@/lib/shopify/types";
import RenderImage from "../utilities/render-Image";

export default function ProductMedia({ product }: { product: Product }) {
  return (
    <div className="flex w-full flex-col border-b border-stroke-gray md:border-b-0 md:border-r">
      <div className="flex md:flex-col lg:flex-row">
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
        <div className="hidden w-full flex-col md:flex">
          {product.images.slice(1, 3).map((image: Image, index: number) => (
            <RenderImage
              key={index}
              src={image.url}
              alt={"product image"}
              width={500}
              height={500}
              className={`${product.images.length > 2 ? "3xl:h-[650px] md:h-full xl:h-[360px]" : "h-full"} w-full object-cover`}
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
          className="hidden h-[450px] w-full object-cover md:block"
          imageClassName="object-cover w-full h-full"
        />
      ))}
    </div>
  );
}
