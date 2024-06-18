import Slider from "../components/slider";

export default async function ReviewSlider() {
  return (
    <section className="w-full">
      <Slider
        text="Reviews"
        spaceBetween={24}
        sliderClass={"px-2x md:px-4x"}
        slidesMobile={1.2}
        slidesTablet={2.2}
        slidesDesktop={3.3}
      />
    </section>
  );
}
