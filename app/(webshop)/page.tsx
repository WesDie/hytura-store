import Hero from "@/components/sections/hero";
import ProductSlider from "@/components/sections/product-slider";
import TextImage from "@/components/sections/text-and-image";
import BaseText from "@/components/sections/base-text";
import Faq from "@/components/sections/faq";
import ReviewSlider from "@/components/sections/review-slider";

import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";

const sectionComponents = {
  hero: Hero,
  textImage: TextImage,
  baseText: BaseText,
  productSlider: ProductSlider,
  faq: Faq,
  reviewSlider: ReviewSlider,
};

export default async function Home() {
  const payload = await getPayload({ config });

  const {
    docs: [homepage],
  } = await payload.find({
    collection: "pages",
    where: {
      slug: { equals: "home" },
    },
  });

  if (!homepage) {
    return notFound();
  }

  return (
    <main>
      {homepage.sections.map((section, index) => {
        const Component =
          sectionComponents[
            section.blockType as keyof typeof sectionComponents
          ];
        if (!Component) return null;

        return <Component key={index} {...section} />;
      })}
    </main>
  );
}
