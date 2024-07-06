"use client";
import { Customer } from "@/lib/shopify/types";
import Input from "../../elements/input";

export default function LoginInformationForm({
  customer,
}: {
  customer: Customer;
}) {
  return (
    <div className="flex w-full flex-col gap-3x">
      <div className="flex gap-3x">
        <h2 className="text-heading-xs">Login information</h2>
      </div>
      <div className="flex flex-col gap-2x">
        <Input
          value={customer.email || ""}
          label="Email"
          name="email"
          disabled={true}
        />
        <Input
          value="*********"
          label="Password"
          name="password"
          disabled={true}
        />
      </div>
    </div>
  );
}
