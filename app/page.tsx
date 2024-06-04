import Hero from "./sections/hero";
import ProductSlider from "./sections/product-slider";

export default async function Home() {
  return (
    <main>
      <Hero
        direction="right"
        title="High quality liquids like never before."
        buttonTitle="Shop now"
        imageSrc="/hero.png"
      />
      <ProductSlider />
      <Hero
        direction="left"
        title="Want to try something new? We got you covered."
        buttonTitle="Shop now"
        imageSrc="/hero2.png"
      />
    </main>
  );
}
