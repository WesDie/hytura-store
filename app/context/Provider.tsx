"use client";

import React from "react";
import { CartDrawerProvider } from "./cart-drawer-context";
import { AccountDrawerProvider } from "./account-drawer-context";
import { MobileNavigationProvider } from "./mobile-navigation-context";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <CartDrawerProvider>
      <AccountDrawerProvider>
        <MobileNavigationProvider>{children}</MobileNavigationProvider>
      </AccountDrawerProvider>
    </CartDrawerProvider>
  );
}
