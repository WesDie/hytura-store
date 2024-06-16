"use client";
import { useCartDrawer, useCartCount } from "../../context/cart-drawer-context";

export default function CartHeader() {
  const { setIsCartOpen } = useCartDrawer();
  const { cartCount } = useCartCount();

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Cart ({cartCount})</p>
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
