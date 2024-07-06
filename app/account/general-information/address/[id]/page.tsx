"use client";
import EditAddressForm from "@/components/account/account-page/edit-address-form";
import { useCustomer } from "@/components/context/customer-context";
import Button from "@/components/elements/button";
import type { Order } from "@/lib/shopify/types";
import Link from "next/link";

export default function Order({ params }: { params: { id: string } }) {
  const { customer } = useCustomer();
  const address = customer?.addresses.find(
    (address) => address.id.split("?")[0].split("/").pop() === params.id,
  );

  if (!address)
    return (
      <div className="my-auto flex flex-col gap-2x p-4x">
        <h1 className="text-heading-md">Address not found</h1>
        <Link href="/account/orders">
          <Button variant="secondary" text={"Back to account"}></Button>
        </Link>
      </div>
    );

  return <EditAddressForm address={address} />;
}
