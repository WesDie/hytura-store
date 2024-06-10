import ProductSlider from "@/app/sections/product-slider";
import { getSingleProductData } from "@/lib/shopify";
import ProductMedia from "@/app/components/product-media";
import ProductDetails from "@/app/components/product-details";
export default async function Product({
  params,
}: {
  params: { handle: string };
}) {
  const response = await getSingleProductData(params.handle);
  const product = response.body.data.product;

  return (
    <main>
      <div className="relative flex h-full border-b border-stroke-gray">
        <ProductMedia product={product} />
        <ProductDetails productData={product} />
      </div>
      <ProductSlider />
    </main>
  );
}
