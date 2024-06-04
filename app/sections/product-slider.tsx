import { getAllProducts } from "@/lib/shopify";
import Slider from "../components/slider";

export default async function ProductSlider() {
  const response = await getAllProducts();
  const products = response.body.data.products.edges.map(
    ({ node }: { node: any }) => node
  );

  return (
    <section className="w-full ">
      <Slider products={products} />
    </section>
  );
}
