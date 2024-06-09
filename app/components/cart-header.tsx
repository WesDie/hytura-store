"use client";
import { useEffect } from "react";

export default function CartHeader(cartData: any) {
  const cart = cartData.cartData;

  function toggleCart() {
    const cartDrawer = document.getElementById("cart-drawer") as HTMLElement;
    if (cartDrawer) {
      cartDrawer.ariaHidden =
        cartDrawer.ariaHidden === "true" ? "false" : "true";
    }
  }

  useEffect(() => {
    const cartCounterElement = document.getElementById("cart-counter");
    if (cartCounterElement) {
      cartCounterElement.innerHTML =
        cartCounterElement?.innerHTML.split(" ")[0] + " (" + cart.length + ")";
    }
  });

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Cart ({cart.length})</p>
      <button className="text-link-sm" onClick={() => toggleCart()}>
        Close
      </button>
    </div>
  );
}
