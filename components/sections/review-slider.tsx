import Slider from "@/components/elements/slider";

export default async function ReviewSlider() {
  return (
    <section className="w-full">
      <Slider
        text="Reviews"
        spaceBetween={24}
        paddingDesktop={32}
        paddingTablet={32}
        paddingMobile={16}
        slidesMobile={1.2}
        slidesTablet={2.2}
        slidesDesktop={3.3}
      />
    </section>
  );
}
