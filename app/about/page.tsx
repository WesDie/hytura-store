import Hero from "@/components/sections/hero";
import TextImage from "@/components/sections/text-and-image";
import BaseText from "@/components/sections/base-text";

export default async function About() {
  return (
    <main>
      <Hero
        direction="right"
        title="We value the health of your plants."
        buttonTitle="Explore"
        imageSrc="/about.png"
      />
      <TextImage
        direction="left"
        title="Enhanced Growth"
        description="Our plant water collection is meticulously crafted to meet the diverse needs of various plant species. From succulents to tropical plants, our specialized water formulations help you achieve the healthiest growth possible. Browse through our selection and find the perfect match for your plant care routine."
        buttonTitle="Shop now"
        imageSrc="/about.png"
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
        imageSrc="/about.png"
      />
    </main>
  );
}
