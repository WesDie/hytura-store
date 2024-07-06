"use client";
import Button from "../../elements/button";
import { Customer } from "@/lib/shopify/types";
import Input from "../../elements/input";
import { useFormState } from "react-dom";
import { shopifyUpdateCustomer } from "../actions";
import { useEffect, useState } from "react";

const initialState = {
  message: "",
};

export default function PersonalInformationForm({
  customer,
}: {
  customer: Customer;
}) {
  const [state, formAction] = useFormState(shopifyUpdateCustomer, initialState);
  const [canbeEdited, setCanBeEdited] = useState(false);

  const [newFirstName, setNewFirstName] = useState(customer.firstName || "");
  const [newLastName, setNewLastName] = useState(customer.lastName || "");
  const [newPhone, setNewPhone] = useState(customer.phone || "");

  const resetForm = () => {
    setNewFirstName(customer.firstName || "");
    setNewLastName(customer.lastName || "");
    setNewPhone(customer.phone || "");
  };

  useEffect(() => {
    if (state.message.success) {
      setCanBeEdited(false);
    }
  }, [state.message]);

  const cancelForm = () => {
    resetForm();
    setCanBeEdited(false);
  };

  return (
    <div className="flex w-full flex-col gap-3x">
      <div className="flex gap-3x">
        <h2 className="text-heading-xs">Personal information</h2>
        {!canbeEdited && (
          <Button
            text={canbeEdited ? "Cancel" : "Edit"}
            variant="link"
            className="mt-auto"
            onclick={() => setCanBeEdited(!canbeEdited)}
          />
        )}
      </div>
      <form action={formAction} className="flex flex-col gap-2x">
        {state.message?.base && (
          <p className="text-body-sm text-text-red">{state.message?.base}</p>
        )}
        <Input
          name="new_first_name"
          label="First name"
          value={newFirstName}
          disabled={!canbeEdited}
          state={state}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <Input
          name="new_last_name"
          label="Last name"
          disabled={!canbeEdited}
          value={newLastName}
          state={state}
          onChange={(e) => setNewLastName(e.target.value)}
        />
        <Input
          name="new_phone"
          label="Phone number"
          value={newPhone}
          disabled={!canbeEdited}
          state={state}
          onChange={(e) => setNewPhone(e.target.value)}
        />
        {canbeEdited && <Button text="Save" variant="primary" type="submit" />}
        {canbeEdited && (
          <Button
            text="Cancel"
            variant="link"
            className="mt-auto"
            onclick={cancelForm}
          />
        )}
      </form>
    </div>
  );
}
