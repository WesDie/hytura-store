import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
const AccountDrawerContext = createContext<{
  isAccountOpen: boolean;
  setIsAccountOpen: Dispatch<SetStateAction<boolean>>;
}>({ isAccountOpen: false, setIsAccountOpen: () => {} });
import { ReactNode } from "react";

export const AccountDrawerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <AccountDrawerContext.Provider value={{ isAccountOpen, setIsAccountOpen }}>
      {children}
    </AccountDrawerContext.Provider>
  );
};

export const useAccountDrawer = () => {
  return useContext(AccountDrawerContext);
};
