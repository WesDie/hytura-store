import CartHeader from "./cart-header";
import CartItemProduct from "./cart-item";
import { getCartData } from "./cart/actions";
import CartSummary from "./cart-summary";
import { CartItem } from "@/lib/shopify/types";

export default async function CartDrawer() {
  const cart = await getCartData();
  if (cart?.id === undefined) return null;

  return (
    <div
      className="group fixed inset-0 z-50 aria-hidden:pointer-events-none"
      aria-hidden="true"
      id="cart-drawer"
    >
      <div
        className="fixed inset-0 bg-black opacity-30 transition-opacity group-aria-hidden:opacity-0"
        id="cart-drawer-toggle"
      ></div>
      <div className="fixed bottom-0 right-0 top-0 flex w-full flex-col bg-background-sand transition-transform duration-300 group-aria-hidden:translate-x-[100%] md:w-[420px]">
        <CartHeader cart={cart} />
        {cart.lines.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-1x">
            <p className="text-heading-2xs">Your cart is empty</p>
            <button className="text-link-xs">Continue shopping</button>
          </div>
        ) : (
          <div className="flex flex-col">
            {cart.lines.map((item: CartItem, index: number) => (
              <CartItemProduct key={index} {...item} />
            ))}
          </div>
        )}
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
