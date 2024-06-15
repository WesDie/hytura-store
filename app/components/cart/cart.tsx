import { getCartData } from "./actions";
import CartDrawer from "./cart-drawer";

export default async function Cart() {
  const cart = await getCartData();
  if (cart?.id === undefined) return null;

  return <CartDrawer cart={cart} />;
}
