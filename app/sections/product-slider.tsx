import { getAllProducts } from "@/lib/shopify";
import Slider from "../components/slider";

export default async function ProductSlider() {
  const products = await getAllProducts();

  return (
    <section className="w-full">
      <Slider products={products} />
    </section>
  );
}
