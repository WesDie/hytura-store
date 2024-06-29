import { getAllBlogsData } from "@/lib/shopify";
import Slider from "@/components/elements/slider";

export default async function ArticleSlider() {
  const blogs = await getAllBlogsData();
  const articles = blogs
    .map((blog) => blog.articles.map((article) => article))
    .flat();

  return (
    <section className="w-full">
      <Slider
        articles={articles}
        text="Learn more"
        spaceBetween={24}
        paddingDesktop={32}
        paddingTablet={32}
        paddingMobile={16}
        slidesMobile={1.2}
        slidesTablet={2.2}
        slidesDesktop={2.8}
      />
    </section>
  );
}
