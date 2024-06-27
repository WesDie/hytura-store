"use client";
import CartHeader from "./cart-header";
import CartItemProduct from "./cart-item";
import CartSummary from "./cart-summary";
import { CartItem } from "@/lib/shopify/types";
import {
  useCartDrawer,
  useCartCount,
} from "@/components/context/cart-drawer-context";
import { Cart } from "@/lib/shopify/types";
import { useEffect } from "react";
import Transiton from "@/components/transition";

export default function CartDrawer({ cart }: { cart: Cart | null }) {
  const { isCartOpen, setIsCartOpen } = useCartDrawer();
  const { setCartCount } = useCartCount();

  useEffect(() => {
    let cartCount = 0;
    if (!cart?.id) return setCartCount(0);

    cart.lines.map((item: CartItem) => {
      cartCount += item.quantity;
    });
    setCartCount(cartCount);
  }, [cart, setCartCount]);

  function EmptyCart(): JSX.Element {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1x">
        <p className="text-heading-2xs">Your cart is empty</p>
        <button className="text-link-xs" onClick={() => setIsCartOpen(false)}>
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <Transiton
      transitonTime={300}
      state={isCartOpen}
      className="fixed inset-0 z-50"
    >
      <div
        className={`fixed inset-0 bg-black opacity-30 transition-opacity group-aria-hidden:opacity-0`}
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div
        className={`fixed bottom-0 right-0 top-0 flex w-full translate-x-0 flex-col bg-background-sand transition-transform duration-300 group-aria-hidden:translate-x-[100%] md:w-[420px]`}
      >
        <CartHeader />
        {!cart?.id ? (
          <EmptyCart />
        ) : cart?.lines?.length === 0 ? (
          <EmptyCart />
        ) : (
          <div
            className="flex h-full flex-col overflow-auto"
            data-lenis-prevent
          >
            {cart?.lines?.map((item: CartItem, index: number) => (
              <CartItemProduct key={index} {...item} />
            ))}
          </div>
        )}
        <CartSummary cart={cart} />
      </div>
    </Transiton>
  );
}
