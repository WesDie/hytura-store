import CartHeader from "./cart-header";
import CartItem from "./cart-item";
import { getCartData } from "./cart/actions";
import CartSummary from "./cart-summary";

export default async function CartDrawer() {
  const cartData = await getCartData();
  if (!cartData.cart) return null;
  const cart = cartData.cart.lines.edges.map((line: any) => line);

  return (
    <div
      className="fixed inset-0 z-50 aria-hidden:hidden"
      aria-hidden="true"
      id="cart-drawer"
    >
      <div
        className="fixed inset-0 bg-black opacity-30"
        id="cart-drawer-toggle"
      ></div>
      <div className="fixed bottom-0 right-0 top-0 flex w-full flex-col bg-background-sand md:w-[420px]">
        <CartHeader cartData={cart} />
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-1x">
            <p className="text-heading-2xs">Your cart is empty</p>
            <button className="text-link-xs">Continue shopping</button>
          </div>
        ) : (
          <div className="flex flex-col">
            {cart.map((item: any, index: any) => (
              <CartItem key={index} itemData={item} />
            ))}
          </div>
        )}
        <CartSummary cartData={cartData} />
      </div>
    </div>
  );
}
