"use client";

import { useFormState, useFormStatus } from "react-dom";
import { shopifyLoginCustomer } from "@/lib/shopify/account/actions";

const initialState = {
  message: "",
};

export default function Login() {
  const [state, formAction] = useFormState(shopifyLoginCustomer, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="flex h-full flex-col gap-1x px-3x py-4x pb-0">
      <h3 className="text-heading-xs">Login</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        <p className="text-body-sm text-text-red">{state.message.base}</p>
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
        <button
          type="submit"
          className="button-primary"
          aria-disabled={pending}
        >
          Login
        </button>
      </form>
    </div>
  );
}
