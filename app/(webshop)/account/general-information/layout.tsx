"use client";
import AddressesOverview from "@/components/account/account-page/addresses-overview";
import { useCustomer } from "@/components/context/customer-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { customer } = useCustomer();

  return (
    <>
      {children}
      <AddressesOverview
        defaultAddressId={customer?.defaultAddress?.id || ""}
        addresses={customer?.addresses || []}
      />
    </>
  );
}
