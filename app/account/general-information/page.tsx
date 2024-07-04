"use client";
import AddressesOverview from "@/components/account/account-page/addresses-overview";
import { useCustomer } from "@/components/context/customer-context";

export default function AccountInformationPage() {
  const { customer } = useCustomer();

  return (
    <>
      <div className="flex w-[60%]"></div>
      <AddressesOverview
        defaultAddressId={customer?.defaultAddress?.id || ""}
        addresses={customer?.addresses || []}
      />
    </>
  );
}
