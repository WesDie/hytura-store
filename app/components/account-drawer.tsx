import Register from "./account/register";
import AccountHeader from "./account/account-header";

export default async function AccountDrawer() {
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
        <Register />
      </div>
    </div>
  );
}
