import Hero from "./sections/hero";
import ProductSlider from "./sections/product-slider";

export default async function Home() {
  return (
    <main>
      <Hero
        direction="right"
        title="High quality liquids like never before"
        buttonTitle="Shop now"
      />
      <ProductSlider />
    </main>
  );
}
