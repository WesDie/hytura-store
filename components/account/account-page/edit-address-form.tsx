"use client";
import Button from "../../elements/button";
import type { Address } from "@/lib/shopify/types";
import Input from "../../elements/input";
import { useFormState } from "react-dom";
import { ShopifyUpdateCustomerAddress } from "../actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountrySelector from "@/components/elements/country-selector";

const initialState = {
  message: "",
};

export default function EditAddressForm({ address }: { address: Address }) {
  const [state, formAction] = useFormState(
    ShopifyUpdateCustomerAddress,
    initialState,
  );
  const router = useRouter();

  const [firstName, setFirstName] = useState(address.firstName || "");
  const [lastName, setLastName] = useState(address.lastName || "");
  const [company, setCompany] = useState(address.company || "");
  const [address1, setAddress1] = useState(address.address1 || "");
  const [city, setCity] = useState(address.city || "");
  const [country, setCountry] = useState(address.countryCode || "");
  const [zip, setZip] = useState(address.zip || "");
  const [phone, setPhone] = useState(address.phone || "");

  useEffect(() => {
    if (state.message.success) {
      router.push("/account/general-information");
    }
  }, [state.message, router]);

  return (
    <div className="flex w-[60%] flex-col gap-3x p-4x">
      <div className="flex gap-3x">
        <h2 className="text-heading-xs">Edit address</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-2x">
        {state.message?.base && (
          <p className="text-body-sm text-text-red">{state.message?.base}</p>
        )}
        <input type="hidden" name="id" value={address.id} />
        <Input
          value="first_name"
          label="First name*"
          inputValue={firstName}
          state={state}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          value="last_name"
          label="Last name*"
          inputValue={lastName}
          state={state}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          value="company"
          label="Company"
          inputValue={company}
          state={state}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Input
          value="address1"
          label="Address*"
          inputValue={address1}
          state={state}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <Input
          value="city"
          label="City*"
          inputValue={city}
          state={state}
          onChange={(e) => setCity(e.target.value)}
        />
        <CountrySelector
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          state={state}
        />
        <Input
          value="zip"
          label="Zip*"
          inputValue={zip}
          state={state}
          onChange={(e) => setZip(e.target.value)}
        />
        <Input
          value="phone"
          label="Phone"
          inputValue={phone}
          state={state}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button text="Save" variant="primary" type="submit" />
        <Link
          href="/account/general-information"
          className="button-link w-full text-center"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
