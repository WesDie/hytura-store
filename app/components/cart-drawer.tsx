import CartHeader from "./cart-header";
import CartItem from "./cart-item";
import { getCartItems } from "./cart/actions";

export default async function CartDrawer() {
  const cartItems = await getCartItems();

  return (
    <div
      className="fixed inset-0 z-50 aria-hidden:hidden"
      aria-hidden="true"
      id="cart-drawer"
    >
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="fixed right-0 top-0 flex h-[100dvh] w-[420px] flex-col bg-background-sand">
        <CartHeader cartData={cartItems} />
        <div>
          {cartItems.map((item: any, index: any) => (
            <CartItem key={index} itemData={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
