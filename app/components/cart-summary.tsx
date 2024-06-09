"use client";
import Link from "next/link";

export default function CartSummary(cartData: any) {
  const cart = cartData.cartData.cart;

  if (!cart.lines.edges.length) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1x border-t border-stroke-gray px-3x py-2x">
      <p className="text-body-xs text-text-light-gray">
        Shipping calculated at checkout
      </p>
      <Link href={cart.checkoutUrl} className="button-primary text-center">
        Checkout - € {cart.cost.totalAmount.amount}
      </Link>
      <button className="text-link-xs">Continue shopping</button>
    </div>
  );
}
