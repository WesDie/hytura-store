"use client";

export default function AccountHeader() {
  function toggleAccountDrawer() {
    const accountDrawer = document.getElementById(
      "account-drawer",
    ) as HTMLElement;
    if (accountDrawer) {
      accountDrawer.ariaHidden =
        accountDrawer.ariaHidden === "true" ? "false" : "true";
    }
  }

  return (
    <div className="flex justify-between border-b border-stroke-gray px-2x py-2x md:px-4x">
      <p className="text-heading-3xs">Account</p>
      <button className="text-link-sm" onClick={() => toggleAccountDrawer()}>
        Close
      </button>
    </div>
  );
}
