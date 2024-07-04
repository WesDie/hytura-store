"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { Customer } from "@/lib/shopify/types";
const CustomerContext = createContext<{
  customer: Customer | null;
}>({ customer: null });

export const CustomerProvider = ({
  children,
  customer,
}: {
  children: ReactNode;
  customer: Customer;
}) => {
  return (
    <CustomerContext.Provider value={{ customer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(CustomerContext);
};
