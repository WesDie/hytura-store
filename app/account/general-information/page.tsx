"use client";
import Addresses from "@/components/account/account-page/addresses";
import { useCustomer } from "@/components/context/customer-context";

export default function AccountInformationPage() {
  const { customer } = useCustomer();
  console.log(customer);

  return (
    <>
      <div className="flex w-[60%]"></div>
      {/* <Addresses
        defaultAddressId={customer?.defaultAddress?.id || ""}
        addresses={customer?.addresses || []}
      /> */}
    </>
  );
}
