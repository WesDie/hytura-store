"use client";

import { useFormState, useFormStatus } from "react-dom";
import { shopifySendPasswordResetEmail } from "@/lib/shopify/account/actions";
import Input from "../elements/input";
import Button from "../elements/button";

const initialState = {
  message: "",
};

export default function ResetPassword() {
  const [state, formAction] = useFormState(
    shopifySendPasswordResetEmail,
    initialState,
  );
  const { pending } = useFormStatus();

  return (
    <div className="flex h-full flex-col gap-3x px-3x py-4x pb-0">
      <div className="flex flex-col gap-1x">
        <h3 className="text-heading-xs">Reset password</h3>
        <p className="text-body-sm text-text-light-gray">
          We will send you an email with the reset password url
        </p>
      </div>
      <form action={formAction} className="flex flex-col gap-2x">
        {state.message.error && (
          <p className="text-body-sm text-text-red">{state.message.error}</p>
        )}
        {state.message.succes && (
          <p className="text-body-sm text-green-700">{state.message.succes}</p>
        )}
        <Input value="email" label="Email" state={state} autoComplete="email" />
        <Button text="Send" variant="primary" disabled={pending} />
      </form>
    </div>
  );
}
