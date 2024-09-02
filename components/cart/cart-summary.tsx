"use client";
import { Cart } from "@/lib/shopify/types";
import Link from "next/link";
import { useCartDrawer } from "@/components/context/cart-drawer-context";
import Button from "../elements/button";

export default function CartSummary({ cart }: { cart: Cart | null }) {
  const { setIsCartOpen } = useCartDrawer();
  if (!cart?.lines?.length) return null;

  return (
    <div className="mt-auto flex flex-col gap-1x border-t border-stroke-gray bg-background-sand px-3x py-2x">
      <p className="text-body-xs text-text-light-gray">
        Shipping calculated at checkout
      </p>
      <Link href={cart.checkoutUrl} className="button-primary text-center">
        Checkout - € {cart.cost.subtotalAmount.amount}
      </Link>
      <Button
        text="Continue shopping"
        variant="link"
        onclick={() => setIsCartOpen(false)}
      />
    </div>
  );
}
