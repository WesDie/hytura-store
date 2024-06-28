"use client";

import { useFormState, useFormStatus } from "react-dom";
import { shopifyLoginCustomer } from "@/lib/shopify/account/actions";
import Input from "../elements/input";
import Button from "../elements/button";
import { Dispatch } from "react";

const initialState = {
  message: "",
};

export default function Login({
  setActiveSection,
}: {
  setActiveSection: Dispatch<string>;
}) {
  const [state, formAction] = useFormState(shopifyLoginCustomer, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="flex h-full flex-col gap-1x px-3x py-4x pb-0">
      <h3 className="text-heading-xs">Login</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        <p className="text-body-sm text-text-red">{state.message.base}</p>
        <Input value="email" label="Email" state={state} autoComplete="email" />
        <Input
          value="password"
          label="Password"
          state={state}
          type="password"
          toggleShow={true}
          autoComplete="current-password"
        />
        <Button
          text="Forgot password?"
          variant="link"
          className="ml-auto"
          onclick={() => setActiveSection("forgot-password")}
        />
        <Button text="Login" variant="primary" disabled={pending} />
      </form>
    </div>
  );
}
