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
    <div className="flex h-full flex-col gap-1x px-3x py-4x">
      <h3 className="text-heading-xs">Register</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        <p className="text-body-sm text-red-400">{state.message?.base}</p>
        <div className="input">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First name"
            aria-invalid={state.message.first_name ? "true" : "false"}
          />
          {state.message.first_name && (
            <p className="text-body-sm text-red-400">
              First name {state.message.first_name}
            </p>
          )}
        </div>
        <div className="input">
          <label htmlFor="last_name">First Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last name"
            aria-invalid={state.message.last_name ? "true" : "false"}
          />
          {state.message.last_name && (
            <p className="text-body-sm text-red-400">
              Last name {state.message.last_name}
            </p>
          )}
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            aria-invalid={state.message.email ? "true" : "false"}
          />
          {state.message.email && (
            <p className="text-body-sm text-red-400">
              Email {state.message.email}
            </p>
          )}
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            aria-invalid={state.message.password ? "true" : "false"}
          />
          {state.message.password && (
            <p className="text-body-sm text-red-400">
              Password {state.message.password}
            </p>
          )}
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
