// @ts-nocheck
"use client";
import { useState } from "react";
import { Product, Article } from "@/lib/shopify/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductButton from "./product-button";
import ArticleCard from "./article-card";
import ReviewCard from "./review-card";
import RenderImage from "../utilities/render-Image";

export default function Slider({
  products,
  text,
  articles,
  spaceBetween,
  sliderClass,
  slidesMobile,
  slidesTablet,
  slidesDesktop,
}: {
  text: string;
  products?: Product[];
  articles?: Article[];
  spaceBetween?: number;
  sliderClass?: string;
  slidesMobile?: number;
  slidesTablet?: number;
  slidesDesktop?: number;
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
          <button onClick={prevto} className="rotate-180">
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
          },
          640: {
            slidesPerView: slidesTablet || 2.2,
          },
          1024: {
            slidesPerView: slidesDesktop || 4.5,
          },
        }}
        onSwiper={setSwiper}
        spaceBetween={spaceBetween || 0}
        className="border-y border-solid border-stroke-gray"
        wrapperClass={sliderClass}
      >
        {products
          ? products.map((product: Product) => (
              <SwiperSlide
                key={product.id}
                className="flex flex-col border-r border-solid border-stroke-gray first-of-type:border-x"
              >
                <ProductButton product={product} />
              </SwiperSlide>
            ))
          : null}
        {articles
          ? articles.map((article: Article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard article={article} />
              </SwiperSlide>
            ))
          : Array.from(Array(10)).map((test: any, index: number) => (
              <SwiperSlide key={index}>
                <ReviewCard />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
