"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { shopifyActivateCustomer } from "../account/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../elements/input";
import Button from "../elements/button";

const initialState = {
  message: "",
};

export default function AccountActivation({ id }: { id: string }) {
  const [state, formAction] = useFormState(
    shopifyActivateCustomer,
    initialState,
  );
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  useEffect(() => {
    if (state.message === "successs") {
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
        <Input
          value="password"
          label="Password"
          state={state}
          type="password"
          toggleShow={true}
          autoComplete="current-password"
        />
        <Input
          value="confirm_password"
          label="Confirm password"
          state={state}
          type="password"
          toggleShow={true}
        />
        <Button text="Activate" variant="primary"></Button>
      </form>
    </div>
  );
}
