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
import { ReactNode } from "react";

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartDrawerContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  return useContext(CartDrawerContext);
};
