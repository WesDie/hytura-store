"use client";
import { Cart, CartItem } from "@/lib/shopify/types";
import { useEffect, useState } from "react";
import { useCartDrawer } from "../../context/cart-drawer-context";

export default function CartHeader({ cart }: { cart: Cart }) {
  const [cartTotalCount, setCartTotalCount] = useState(0);
  const { setIsCartOpen } = useCartDrawer();

  useEffect(() => {
    let cartCount = 0;
    cart.lines.map((item: CartItem) => {
      cartCount += item.quantity;
    });
    setCartTotalCount(cartCount);

    const cartCounterElement = document
      .querySelector("header")
      ?.querySelector("#cart-toggle");
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
      <button
        className="text-link-sm"
        id="cart-toggle"
        onClick={() => setIsCartOpen(false)}
      >
        Close
      </button>
    </div>
  );
}
