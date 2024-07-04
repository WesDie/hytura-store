"use client";
import OrderOverview from "@/components/account/account-page/order-overview";
import { useCustomer } from "@/components/context/customer-context";
import { Customer } from "@/lib/shopify/types";

export default function Orders() {
  const { customer } = useCustomer();

  return <OrderOverview customer={customer ?? ({} as Customer)} />;
}
