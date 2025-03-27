// @ts-nocheck
"use client";
import { useState } from "react";
import { Product, Article, Review } from "@/lib/shopify/types";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import ProductButton from "./product-button";
import ArticleCard from "./article-card";
import ReviewCard from "./review-card";
import RenderImage from "../utilities/render-Image";

export default function Slider({
  products,
  text,
  articles,
  reviews,
  spaceBetween,
  sliderClass,
  slidesMobile,
  slidesTablet,
  slidesDesktop,
  paddingDesktop,
  paddingTablet,
  paddingMobile,
  textClass,
}: {
  text: string;
  products?: Product[];
  articles?: Article[];
  reviews?: Review[];
  spaceBetween?: number;
  sliderClass?: string;
  slidesMobile?: number;
  slidesTablet?: number;
  slidesDesktop?: number;
  paddingDesktop?: number;
  paddingTablet?: number;
  paddingMobile?: number;
  textClass?: string;
}) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const nexto = () => {
    swiper?.slideNext();
  };

  const prevto = () => {
    swiper?.slidePrev();
  };

  const handleSlideChange = () => {
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <div>
      <div className="flex w-full justify-between px-2x py-2x md:px-4x md:pb-2x md:pt-3x">
        <h1
          className={`text-heading-xs md:text-heading-md ${textClass ? textClass : ""}`}
        >
          {text}
        </h1>
        <div className="flex gap-2x">
          <button
            onClick={prevto}
            disabled={isBeginning}
            className="transition-opacity disabled:opacity-30"
          >
            <RenderImage
              src={"/icons/arrow-left.svg"}
              alt={"arrow left"}
              width={16}
              height={17}
            />
          </button>
          <button
            onClick={nexto}
            disabled={isEnd}
            className="transition-opacity disabled:opacity-30"
          >
            <RenderImage
              src={"/icons/arrow-right.svg"}
              alt={"arrow right"}
              width={16}
              height={17}
            />
          </button>
        </div>
      </div>
      <Swiper
        modules={[FreeMode, Mousewheel]}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.25,
          momentumVelocityRatio: 0.5,
        }}
        breakpoints={{
          0: {
            slidesPerView: slidesMobile || 1.2,
            slidesOffsetBefore: paddingMobile || 0,
            slidesOffsetAfter: paddingMobile || 0,
          },
          768: {
            slidesPerView: slidesTablet || 2.2,
            slidesOffsetBefore: paddingTablet || 0,
            slidesOffsetAfter: paddingTablet || 0,
          },
          1024: {
            slidesPerView: slidesDesktop || 4.5,
            slidesOffsetBefore: paddingDesktop || 0,
            slidesOffsetAfter: paddingDesktop || 0,
          },
        }}
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
        }}
        onSlideChange={handleSlideChange}
        spaceBetween={spaceBetween || 0}
        className={`-translate-x-[1px] border-y border-solid border-stroke-gray ${sliderClass ? sliderClass : ""}`}
      >
        {products && products.length > 0
          ? products.map((product: Product) => (
              <SwiperSlide
                key={product.id}
                className="flex h-full flex-col border-r border-solid border-stroke-gray first-of-type:border-x"
              >
                <ProductButton product={product} />
              </SwiperSlide>
            ))
          : null}
        {articles && articles.length > 0
          ? articles.map((article: Article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard article={article} />
              </SwiperSlide>
            ))
          : null}
        {!products && !articles && reviews && reviews.length > 0
          ? reviews.map((review: Review[], index: number) => (
              <SwiperSlide key={index} className="!flex !h-auto">
                <ReviewCard review={reviews[index]} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
}
