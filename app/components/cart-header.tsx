"use client";
import { Cart, CartItem } from "@/lib/shopify/types";
import { useEffect, useState } from "react";

export default function CartHeader({ cart }: { cart: Cart }) {
  const [cartTotalCount, setCartTotalCount] = useState(0);

  function toggleCart() {
    const cartDrawer = document.getElementById("cart-drawer") as HTMLElement;
    if (cartDrawer) {
      cartDrawer.ariaHidden =
        cartDrawer.ariaHidden === "true" ? "false" : "true";
    }
  }

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
      <button className="text-link-sm" onClick={() => toggleCart()}>
        Close
      </button>
    </div>
  );
}
