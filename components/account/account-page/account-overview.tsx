"use client";
import { Customer } from "@/lib/shopify/types";
import LoginInformationForm from "./login-information-form";
import PersonalInformationForm from "./personal-information-form";

export default function AccountOverview({ customer }: { customer: Customer }) {
  return (
    <div className="flex w-[60%] flex-col gap-5x p-4x pb-7x">
      <PersonalInformationForm customer={customer} />
      <LoginInformationForm customer={customer} />
    </div>
  );
}
