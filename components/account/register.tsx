"use client";

import { useFormState } from "react-dom";
import { shopifyCreateCustomer } from "../account/actions";
import Input from "../elements/input";
import Button from "../elements/button";
import { Dispatch } from "react";
import { useEffect } from "react";

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
    if (state.message.success) {
      setActiveSection("login");
      setSuccessMessage("Account created successfully. Please login.");
    }
  }, [state.message, setActiveSection, setSuccessMessage]);

  return (
    <div className="flex h-full flex-col gap-2x px-3x py-5x pb-0">
      <h3 className="text-heading-xs">Register</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        {state.message?.base && (
          <p className="text-body-sm text-text-red">{state.message?.base}</p>
        )}
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
          {state.message.terms_invalid}
          <input
            type="checkbox"
            id="accepts_terms"
            name="accpets_terms"
            onClick={() => {
              state.message.terms_invalid = false;
            }}
            className={`${state.message.terms_invalid ? "!outline-stroke-red" : ""}`}
          />
          {state.message.terms_invalid}
          <label
            htmlFor="accepts_terms"
            className={`${state.message.terms_invalid ? "!text-text-red" : ""}`}
          >
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
        <Button text="Register" variant="primary" />
      </form>
    </div>
  );
}
