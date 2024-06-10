import RenderImage from "./render-Image";

export default function ProductMedia(product: any) {
  const productImages = product.product.images.edges;

  return (
    <div className="flex w-full flex-col border-r border-stroke-gray">
      <div className="flex">
        {productImages.slice(0, 1).map((node: any, index: number) => (
          <RenderImage
            key={index}
            src={node.node.url}
            alt={"product image"}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            imageClassName="object-cover w-full h-full"
          />
        ))}
        <div className="flex w-full flex-col">
          {productImages.slice(1, 3).map((node: any, index: number) => (
            <RenderImage
              key={index}
              src={node.node.url}
              alt={"product image"}
              width={500}
              height={500}
              className="h-[350px] w-full object-cover"
              imageClassName="object-cover w-full h-full"
            />
          ))}
        </div>
      </div>
      {productImages.slice(3).map((node: any, index: number) => (
        <RenderImage
          key={index}
          src={node.node.url}
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
