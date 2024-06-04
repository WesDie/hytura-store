// @ts-nocheck
"use client";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductButton from "./product-button";

export default function Slider(products: { products: any[] }) {
  const [swiper, setSwiper] = useState(null);

  const nexto = () => {
    swiper.slideNext();
  };

  const prevto = () => {
    swiper.slidePrev();
  };

  return (
    <div>
      <div className="w-full justify-between px-2x md:px-4x py-2x md:pt-3x md:pb-2x flex">
        <h1 className="text-heading-xs md:text-heading-md">Our products</h1>
        <div className="flex gap-2x">
          <button onClick={prevto} className="rotate-180">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 8.43325L7.36428 1.83325M14.6667 8.43325L7.36428 15.0333M14.6667 8.43325H0"
                stroke="#1F1F1F"
              />
            </svg>
          </button>
          <button onClick={nexto}>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 8.43325L7.36428 1.83325M14.6667 8.43325L7.36428 15.0333M14.6667 8.43325H0"
                stroke="#1F1F1F"
              />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 4.5,
          },
        }}
        onSwiper={setSwiper}
        className=" border-y border-stroke-gray border-solid"
      >
        {products.products.map((product: any) => (
          <SwiperSlide
            key={product.id}
            className="flex flex-col border-r first-of-type:border-x border-solid border-stroke-gray"
          >
            <ProductButton product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
