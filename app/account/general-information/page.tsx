"use client";
import AccountOverview from "@/components/account/account-page/account-overview";
import { useCustomer } from "@/components/context/customer-context";
import { Customer } from "@/lib/shopify/types";

export default function AccountInformationPage() {
  const { customer } = useCustomer();

  return <AccountOverview customer={customer ?? ({} as Customer)} />;
}
