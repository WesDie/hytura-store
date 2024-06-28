"use client";
import { useAccountDrawer } from "@/components/context/account-drawer-context";
import Button from "../elements/button";

export default function AccountHeader() {
  const { setIsAccountOpen } = useAccountDrawer();

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Account</p>
      <Button
        text="Close"
        variant="link"
        onclick={() => setIsAccountOpen(false)}
      />
    </div>
  );
}
