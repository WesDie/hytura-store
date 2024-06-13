"use client";

import { ToggleAccountDrawer } from "@/app/sections/header";

export default function AccountHeader() {
  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Account</p>
      <button className="text-link-sm" onClick={() => ToggleAccountDrawer()}>
        Close
      </button>
    </div>
  );
}
