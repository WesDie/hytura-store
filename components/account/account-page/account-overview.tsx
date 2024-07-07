"use client";
import { Customer } from "@/lib/shopify/types";
import LoginInformationForm from "./login-information-form";
import PersonalInformationForm from "./personal-information-form";

export default function AccountOverview({ customer }: { customer: Customer }) {
  return (
    <div className="flex w-full flex-col gap-5x p-2x pb-5x md:w-[60%] md:p-4x md:pb-7x">
      <PersonalInformationForm customer={customer} />
      <LoginInformationForm customer={customer} />
    </div>
  );
}
