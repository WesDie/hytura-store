"use client";

import React from "react";
import { CartDrawerProvider } from "./cart-drawer-context";
import {
  AccountDrawerProvider,
  useAccountDrawer,
} from "./account-drawer-context";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <CartDrawerProvider>
      <AccountDrawerProvider>{children}</AccountDrawerProvider>
    </CartDrawerProvider>
  );
}
