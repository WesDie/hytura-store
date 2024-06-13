import { cookies } from "next/headers";
import AccountHeader from "./account/account-header";
import MainAccount from "./account/main-account";
import { redirect } from "next/dist/server/api-utils";

export default async function AccountDrawer() {
  if (cookies().get("customerAccessToken")) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 aria-hidden:hidden"
      aria-hidden="true"
      id="account-drawer"
    >
      <div
        className="fixed inset-0 bg-black opacity-30"
        id="cart-drawer-toggle"
      ></div>
      <div className="fixed bottom-0 left-0 top-0 flex w-full flex-col bg-background-sand md:w-[420px]">
        <AccountHeader />
        <MainAccount />
      </div>
    </div>
  );
}
