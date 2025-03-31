import Hero from "@/components/sections/hero";
import TextImage from "@/components/sections/text-and-image";
import BaseText from "@/components/sections/base-text";

export default async function About() {
  return (
    <main>
      <Hero
        direction="right"
        title="Nourish your plants, transform your space."
        buttonTitle="Explore"
        imageSrc="/about1.png"
      />
      <BaseText
        alignment="text-center"
        subtitle="Healthy Plants, Happy Homes"
        title="Transform your living space with vibrant, thriving plants that radiate health and beauty."
        buttonTitle="Shop all products"
      />
      <TextImage
        direction="left"
        title="Nourish Your Indoor Garden"
        className="md:!h-[436px]"
        description="Located in Haarlem, Netherlands, our company specializes in premium, high-quality liquids for your indoor plants. Our products are expertly crafted to cater to the specific needs of various plant species, promoting vibrant growth and overall well-being. Discover our collection and find the ideal solution for your plant care journey."
        buttonTitle="Contact us"
        url="/contact"
        imageSrc="/about2.jpeg"
      />
      <TextImage
        direction="right"
        className="md:!h-[436px]"
        title="Rooted in Excellence"
        description="Our mission is to elevate indoor plant care with premium-quality liquids designed to enhance growth and vitality. With a passion for plants and a commitment to innovation, we carefully craft each formulation to nourish a wide range of species, from the hardiest succulents to the most delicate ferns. Trust our expertise to bring out the best in your indoor garden."
        buttonTitle="Shop all products"
        imageSrc="/about3.png"
      />
    </main>
  );
}
