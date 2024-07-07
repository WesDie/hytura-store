"use client";
import Link from "next/link";
import Button from "../../elements/button";
import { Address } from "@/lib/shopify/types";
import { usePathname } from "next/navigation";
import { ShopifyDeleteCustomerAddress } from "../actions";
import { useFormState } from "react-dom";
import { useState } from "react";

const initialState = {
  message: "",
};

export default function AddressesOverview({
  addresses,
  defaultAddressId,
}: {
  addresses: Address[];
  defaultAddressId: string;
}) {
  const [state, formAction] = useFormState(
    ShopifyDeleteCustomerAddress,
    initialState,
  );

  const [deleteOverlay, setDeleteOverlay] = useState(
    addresses.map(() => false),
  );

  const pathname = usePathname();
  const addressId = addresses.map((address) =>
    address.id.split("?")[0].split("/").pop(),
  );
  const isActiveAddress = addresses.map((address, index) =>
    pathname === "/account/general-information/address/" + addressId[index]
      ? true
      : false,
  );

  return (
    <div className="flex w-full flex-col gap-1x border-l border-solid border-stroke-light-gray p-4x pb-7x">
      <h2 className="text-heading-xs">Your addresses</h2>
      {addresses.map((address, index) => (
        <div
          key={address.id}
          className="relative flex w-full flex-col gap-2x border-b border-solid border-stroke-light-gray py-2x"
        >
          <div
            className={`absolute inset-0 flex bg-background-sand bg-opacity-70 transition-opacity ${deleteOverlay[index] ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="m-auto flex gap-1x">
              <form action={formAction}>
                <input type="hidden" name="id" value={address.id} />
                <Button
                  text="Delete"
                  variant="primary"
                  className="text-body-sm"
                />
              </form>
              <Button
                text="Cancel"
                variant="secondary"
                className="text-body-sm"
                onclick={() => {
                  const updatedOverlay = [...deleteOverlay];
                  updatedOverlay[index] = false;
                  setDeleteOverlay(updatedOverlay);
                }}
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <h3
              className={`text-heading-2xs ${
                isActiveAddress[index] ? "underline" : ""
              }`}
            >
              {address.address1}
            </h3>
            {address.id === defaultAddressId && (
              <p className="text-heading-3xs my-auto text-text-light-gray">
                Default address
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <ul className="text-body-sm flex flex-col gap-1x text-text-light-gray">
              <li>{address.name}</li>
              <li>{address.address1}</li>
              <li>
                {address.zip} {address.city}
              </li>
              <li>{address.country}</li>
            </ul>
            <div className="mt-auto flex h-fit gap-1x">
              {isActiveAddress[index] ? (
                <Link
                  href="/account/general-information"
                  className="button-link"
                >
                  Cancel
                </Link>
              ) : (
                <Link
                  href={`/account/general-information/address/${addressId[index]}`}
                  className="button-link"
                >
                  Edit
                </Link>
              )}
              <Button
                text="Remove"
                variant="link"
                onclick={() => {
                  const updatedOverlay = [...deleteOverlay];
                  updatedOverlay[index] = true;
                  setDeleteOverlay(updatedOverlay);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <Link href="/account/general-information/address/new">
        <Button
          text="Add address"
          variant="secondary"
          className="mt-2x w-fit"
        />
      </Link>
    </div>
  );
}
