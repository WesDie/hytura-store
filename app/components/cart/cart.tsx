import { getCartData } from "./actions";
import CartDrawer from "./cart-drawer";

export default async function Cart() {
  const cart = await getCartData();

  return <CartDrawer cart={cart} />;
}
