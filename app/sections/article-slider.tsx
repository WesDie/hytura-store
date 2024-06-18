import { getAllBlogsData } from "@/lib/shopify";
import Slider from "../components/slider";

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
        sliderClass={"px-2x md:px-4x"}
        slidesMobile={1.2}
        slidesTablet={2.2}
        slidesDesktop={2.8}
      />
    </section>
  );
}
