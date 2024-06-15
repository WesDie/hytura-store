"use client";

import { useAccountDrawer } from "../../context/account-drawer-context";

export default function AccountHeader() {
  const { setIsAccountOpen } = useAccountDrawer();

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Account</p>
      <button className="text-link-sm" onClick={() => setIsAccountOpen(false)}>
        Close
      </button>
    </div>
  );
}
