"use client";
import {
  useCartDrawer,
  useCartCount,
} from "@/components/context/cart-drawer-context";
import Button from "@/components/elements/button";

export default function CartHeader() {
  const { setIsCartOpen } = useCartDrawer();
  const { cartCount } = useCartCount();

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Cart ({cartCount})</p>
      <Button
        text="Close"
        variant="link"
        onclick={() => setIsCartOpen(false)}
      />
    </div>
  );
}
