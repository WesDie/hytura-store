import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
const MobileNavigationContext = createContext<{
  isMobileNavigationOpen: boolean;
  setIsMobileNavigationOpen: Dispatch<SetStateAction<boolean>>;
}>({ isMobileNavigationOpen: false, setIsMobileNavigationOpen: () => {} });

export const MobileNavigationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  return (
    <MobileNavigationContext.Provider
      value={{ isMobileNavigationOpen, setIsMobileNavigationOpen }}
    >
      {children}
    </MobileNavigationContext.Provider>
  );
};

export const useMobileNavigation = () => {
  return useContext(MobileNavigationContext);
};
