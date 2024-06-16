"use client";
import CartHeader from "./cart-header";
import CartItemProduct from "./cart-item";
import CartSummary from "./cart-summary";
import { CartItem } from "@/lib/shopify/types";
import { useCartDrawer, useCartCount } from "../../context/cart-drawer-context";
import { Cart } from "@/lib/shopify/types";
import { useEffect } from "react";

export default function CartDrawer({ cart }: { cart: Cart }) {
  const { isCartOpen, setIsCartOpen } = useCartDrawer();
  const { setCartCount } = useCartCount();

  useEffect(() => {
    let cartCount = 0;
    cart.lines.map((item: CartItem) => {
      cartCount += item.quantity;
    });
    setCartCount(cartCount);
  }, [cart, setCartCount]);

  if (cart?.id === undefined) return null;

  return (
    isCartOpen && (
      <div className="group fixed inset-0 z-50">
        <div
          className={`fixed inset-0 bg-black ${isCartOpen ? "opacity-30" : ""} opacity-0 transition-opacity`}
          onClick={() => setIsCartOpen(false)}
        ></div>
        <div
          className={`fixed bottom-0 right-0 top-0 flex w-full flex-col bg-background-sand transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-[100%]"} md:w-[420px]`}
        >
          <CartHeader />
          {cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-1x">
              <p className="text-heading-2xs">Your cart is empty</p>
              <button
                className="text-link-xs"
                onClick={() => setIsCartOpen(false)}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div
              className="flex h-full flex-col overflow-auto"
              data-lenis-prevent
            >
              {cart.lines.map((item: CartItem, index: number) => (
                <CartItemProduct key={index} {...item} />
              ))}
            </div>
          )}
          <CartSummary cart={cart} />
        </div>
      </div>
    )
  );
}
