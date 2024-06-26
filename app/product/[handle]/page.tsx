import ProductSlider from "@/components/sections/product-slider";
import { getSingleProductData } from "@/lib/shopify";
import ProductMedia from "@/components/product-media";
import ProductDetails from "@/components/product-details";
export default async function Product({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getSingleProductData(params.handle);

  return (
    <main>
      <div className="relative flex h-full border-b border-stroke-gray">
        <ProductMedia product={product} />
        <ProductDetails product={product} />
      </div>
      <ProductSlider />
    </main>
  );
}
