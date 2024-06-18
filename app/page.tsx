import Hero from "./sections/hero";
import ProductSlider from "./sections/product-slider";
import TextImage from "./sections/text-and-image";
import BaseText from "./sections/base-text";
import Faq from "./sections/faq";
import ReviewSlider from "./sections/review-slider";

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
      <TextImage
        direction="left"
        title="Enhanced Growth"
        description="Our plant water collection is meticulously crafted to meet the diverse needs of various plant species. From succulents to tropical plants, our specialized water formulations help you achieve the healthiest growth possible. Browse through our selection and find the perfect match for your plant care routine."
        buttonTitle="Shop now"
        imageSrc="/hero2.png"
      />
      <BaseText
        alignment="text-center"
        subtitle="Solutions for you"
        title="Simply water your plants as usual with our specially formulated solutions"
        buttonTitle="Shop all products"
      />
      <TextImage
        direction="right"
        title="It has never been easier"
        description="Our plant water collection is meticulously crafted to meet the diverse needs of various plant species. From succulents to tropical plants, our specialized water formulations help you achieve the healthiest growth possible. Browse through our selection and find the perfect match for your plant care routine."
        buttonTitle="Shop all products"
        imageSrc="/hero2.png"
      />
      <Faq direction="right" />
      <ReviewSlider />
    </main>
  );
}
