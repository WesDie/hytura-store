import Hero from "@/components/sections/hero";
import ProductSlider from "@/components/sections/product-slider";
import TextImage from "@/components/sections/text-and-image";
import BaseText from "@/components/sections/base-text";
import Faq from "@/components/sections/faq";
import ReviewSlider from "@/components/sections/review-slider";

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
        imageSrc="/landing1.png"
        url="/collection/all"
      />
      <BaseText
        alignment="text-center"
        subtitle="Solutions for you"
        title="Simply water your plants as usual with our specially formulated solutions"
      />
      <TextImage
        direction="right"
        title="Your Plants, Our Passion"
        description="Transform your indoor garden with our high-quality plant care liquids, designed to nurture a wide variety of plants, from succulents to tropical species. Our expertly crafted formulations provide essential nutrients that promote vibrant growth and lasting health. Whether you’re an experienced plant parent or just getting started, our products are here to support every step of your green journey."
        buttonTitle="About us"
        imageSrc="/landing2.png"
        url="/about"
      />
      <Faq direction="right" />
      <ReviewSlider />
    </main>
  );
}
