"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { shopifyActivateCustomer } from "@/lib/shopify/account/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
};

export default function AccountActivation({ id }: { id: string }) {
  const [state, formAction] = useFormState(
    shopifyActivateCustomer,
    initialState,
  );
  const { pending } = useFormStatus();
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  useEffect(() => {
    if (state.message === "success") {
      router.push("/account");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="m-auto flex h-fit w-full max-w-[500px] flex-col gap-1x px-3x py-4x pb-0">
      <h3 className="text-heading-xs">Activate account</h3>
      <form action={formAction} className="flex flex-col gap-2x">
        <p className="text-body-sm text-text-red">{state.message.base}</p>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="activationToken" value={token || ""} />
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
        <div className="input">
          <div className="flex justify-between">
            <label htmlFor="confirm_password">Confirm Password</label>
            {state.message.confirm_password && (
              <p className="text-body-sm text-text-red">
                * Confirm Password {state.message.confirm_password}
              </p>
            )}
          </div>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm Password"
            aria-invalid={state.message.email ? "true" : "false"}
          />
        </div>
        <button
          type="submit"
          className="button-primary"
          aria-disabled={pending}
        >
          Activate
        </button>
      </form>
    </div>
  );
}
