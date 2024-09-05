// @ts-nocheck
"use client";
import { useState } from "react";
import { Product, Article, Review } from "@/lib/shopify/types";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
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
}) {
  const [swiper, setSwiper] = useState(null);

  const nexto = () => {
    swiper.slideNext();
  };

  const prevto = () => {
    swiper.slidePrev();
  };

  return (
    <div>
      <div className="flex w-full justify-between px-2x py-2x md:px-4x md:pb-2x md:pt-3x">
        <h1 className="text-heading-xs md:text-heading-md">{text}</h1>
        <div className="flex gap-2x">
          <button onClick={prevto}>
            <RenderImage
              src={"/icons/arrow-left.svg"}
              alt={"arrow left"}
              width={16}
              height={17}
            />
          </button>
          <button onClick={nexto}>
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
        onSwiper={setSwiper}
        spaceBetween={spaceBetween || 0}
        className={`border-y border-solid border-stroke-gray ${sliderClass ? sliderClass : ""}`}
      >
        {products && products.length > 0
          ? products.map((product: Product) => (
              <SwiperSlide
                key={product.id}
                className="flex flex-col border-r border-solid border-stroke-gray first-of-type:border-x"
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
          ? reviews.map((review: review[], index: number) => (
              <SwiperSlide key={index} className="!flex !h-auto">
                <ReviewCard review={reviews[index]} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
}
