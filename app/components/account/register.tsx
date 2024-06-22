"use client";

import { useFormState, useFormStatus } from "react-dom";
import { shopifyCreateCustomer } from "@/lib/shopify/account/actions";

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
        <div className="input">
          <div className="flex justify-between">
            <label htmlFor="first_name">First Name</label>
            {state.message.first_name && (
              <p className="text-body-sm text-text-red">
                * First name {state.message.first_name}
              </p>
            )}
          </div>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First name"
            aria-invalid={state.message.first_name ? "true" : "false"}
          />
        </div>
        <div className="input">
          <div className="flex justify-between">
            <label htmlFor="last_name">First Name</label>
            {state.message.last_name && (
              <p className="text-body-sm text-text-red">
                * Last name {state.message.last_name}
              </p>
            )}
          </div>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last name"
            aria-invalid={state.message.last_name ? "true" : "false"}
          />
        </div>
        <div className="input">
          <div className="flex justify-between">
            <label htmlFor="email">Email</label>
            {state.message.email && (
              <p className="text-body-sm text-text-red">
                * Email {state.message.email}
              </p>
            )}
          </div>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            aria-invalid={state.message.email ? "true" : "false"}
          />
        </div>
        <div className="input">
          <div className="flex justify-between">
            <label htmlFor="password">Password</label>
            {state.message.password && (
              <p className="text-body-sm text-text-red">
                * Password {state.message.password}
              </p>
            )}
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            aria-invalid={state.message.password ? "true" : "false"}
          />
        </div>
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
            Sign up for emails on products, deals or Other announcements by
            Hytura. Unsubscribe at any time
          </label>
        </div>
        <button
          type="submit"
          className="button-primary"
          aria-disabled={pending}
        >
          Register
        </button>
      </form>
    </div>
  );
}
