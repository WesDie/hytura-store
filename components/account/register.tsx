"use client";

import { useFormState, useFormStatus } from "react-dom";
import { shopifyCreateCustomer } from "@/lib/shopify/account/actions";
import Input from "../elements/input";
import Button from "../elements/button";

const initialState = {
  message: "",
};

export default function Register() {
  const [state, formAction] = useFormState(shopifyCreateCustomer, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="flex h-full flex-col gap-1x px-3x py-4x pb-0">
      <h3 className="text-heading-xs">Register</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        <p className="text-body-sm text-text-red">{state.message?.base}</p>
        <Input value="first_name" label="First name" state={state} />
        <Input value="last_name" label="Last name" state={state} />
        <Input value="email" label="Email" state={state} autoComplete="email" />
        <Input
          value="password"
          label="Password"
          state={state}
          type="password"
          toggleShow={true}
          autoComplete="current-password"
        />
        <div className="checkbox">
          <input type="checkbox" id="accepts_terms" name="accpets_terms" />
          <label htmlFor="accepts_terms">
            By clicking here, I agree to the Terms of Service and Privacy Policy
          </label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="email_marketing_status"
            name="email_marketing_status"
          />
          <label htmlFor="email_marketing_status">
            Sign up for emails on products, deals or other announcements by
            Hytura. Unsubscribe at any time
          </label>
        </div>
        <Button text="Register" variant="primary" disabled={pending} />
      </form>
    </div>
  );
}
