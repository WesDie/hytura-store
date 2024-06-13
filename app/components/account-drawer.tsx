import { cookies } from "next/headers";
import AccountHeader from "./account/account-header";
import MainAccount from "./account/main-account";

export default async function AccountDrawer() {
  if (cookies().get("customerAccessToken")) {
    return null;
  }

  return (
    <div
      className="group fixed inset-0 z-50 aria-hidden:pointer-events-none"
      aria-hidden="true"
      id="account-drawer"
    >
      <div
        className="fixed inset-0 bg-black opacity-30 transition-opacity group-aria-hidden:opacity-0"
        id="cart-drawer-toggle"
      ></div>
      <div className="fixed bottom-0 left-0 top-0 flex w-full flex-col bg-background-sand transition-transform duration-300 group-aria-hidden:translate-x-[-100%] md:w-[420px]">
        <AccountHeader />
        <MainAccount />
      </div>
    </div>
  );
}
