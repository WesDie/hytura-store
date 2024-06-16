import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
const CartDrawerContext = createContext<{
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}>({ isCartOpen: false, setIsCartOpen: () => {} });

const CartCountContext = createContext<{
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
}>({ cartCount: 0, setCartCount: () => {} });

import { ReactNode } from "react";

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartDrawerContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      <CartCountContext.Provider value={{ cartCount, setCartCount }}>
        {children}
      </CartCountContext.Provider>
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  return useContext(CartDrawerContext);
};

export const useCartCount = () => {
  return useContext(CartCountContext);
};
