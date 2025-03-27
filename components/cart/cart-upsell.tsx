"use client";
import { Cart, Product } from "@/lib/shopify/types";
import Slider from "../elements/slider";
import { getAllProducts, getProductRecommendations } from "@/lib/shopify";
import { useState, useEffect } from "react";

export default function CartUpsell({ cart }: { cart: Cart | null }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!cart?.lines[0]?.merchandise?.product?.id) {
        const products = await getAllProducts();
        setProducts(
          products.filter((product) => product.availableForSale).slice(0, 4),
        );
      } else {
        const recommendations = await getProductRecommendations(
          cart?.lines[0].merchandise.product.id,
        );
        setProducts(recommendations);
      }
    };
    fetchProducts();
  }, [cart]);

  return (
    <div className="mt-auto flex flex-col gap-1x border-t border-stroke-gray bg-background-sand">
      <Slider
        products={products}
        text="Recommended products"
        slidesMobile={1.7}
        slidesTablet={1.6}
        slidesDesktop={1.6}
        sliderClass="border-b-0"
        textClass="text-heading-2xs md:text-heading-2xs"
      />
    </div>
  );
}
