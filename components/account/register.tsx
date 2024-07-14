"use client";

import { useFormState } from "react-dom";
import { shopifyCreateCustomer } from "../account/actions";
import Input from "../elements/input";
import Button from "../elements/button";
import { Dispatch } from "react";
import { useEffect } from "react";
import Checkbox from "../elements/checkbox";

const initialState = {
  message: "",
};

export default function Register({
  setActiveSection,
  setSuccessMessage,
}: {
  setActiveSection: Dispatch<string>;
  setSuccessMessage: Dispatch<string>;
}) {
  const [state, formAction] = useFormState(shopifyCreateCustomer, initialState);

  useEffect(() => {
    if (state?.message?.success === "Created customer successfully") {
      setActiveSection("login");
      setSuccessMessage(state?.message?.success);
    }
  }, [state.message, setActiveSection, setSuccessMessage]);

  return (
    <div className="flex h-full flex-col gap-2x px-3x py-5x pb-0">
      <h3 className="text-heading-xs">Register</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        {state?.message?.base && (
          <p className="text-body-sm text-text-red">{state.message?.base}</p>
        )}
        {state?.message?.success && (
          <p className="text-body-sm text-text-green">
            {state.message.success}
          </p>
        )}
        <Input name="first_name" label="First name" state={state} />
        <Input name="last_name" label="Last name" state={state} />
        <Input name="email" label="Email" state={state} autoComplete="email" />
        <Input
          name="password"
          label="Password"
          state={state}
          type="password"
          toggleShow={true}
          autoComplete="current-password"
        />
        <Checkbox
          value="accepts_terms"
          label="By clicking here, I agree to the Terms of Service and Privacy Policy"
          state={state}
        />
        <Checkbox
          value="email_marketing_status"
          label="Sign up for emails on products, deals or other announcements by Hytura. Unsubscribe at any time"
          state={state}
        />
        <Button text="Register" variant="primary" />
      </form>
    </div>
  );
}
