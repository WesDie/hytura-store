"use client";
import { Cart, CartItem } from "@/lib/shopify/types";
import { useEffect, useState } from "react";
import { ToggleCart } from "../sections/header";

export default function CartHeader({ cart }: { cart: Cart }) {
  const [cartTotalCount, setCartTotalCount] = useState(0);

  useEffect(() => {
    let cartCount = 0;
    cart.lines.map((item: CartItem) => {
      cartCount += item.quantity;
    });
    setCartTotalCount(cartCount);

    const cartCounterElement = document.getElementById("cart-counter");
    if (cartCounterElement) {
      cartCounterElement.innerHTML =
        cartCounterElement?.innerHTML.split(" ")[0] +
        " (" +
        cartTotalCount +
        ")";
    }
  }, [cart, cartTotalCount]);

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Cart ({cartTotalCount})</p>
      <button className="text-link-sm" onClick={() => ToggleCart()}>
        Close
      </button>
    </div>
  );
}
