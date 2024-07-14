"use client";
import AccountHeader from "@/components/account/account-header";
import MainAccount from "@/components/account/main-account";
import { useAccountDrawer } from "@/components/context/account-drawer-context";
import Transiton from "@/components/utilities/transition";

export default function AccountDrawer() {
  const { isAccountOpen, setIsAccountOpen } = useAccountDrawer();

  return (
    <Transiton
      transitonTime={300}
      state={isAccountOpen}
      className="group fixed inset-0 z-50"
    >
      <div
        className="blur-bg fixed inset-0 bg-[#00000044] transition-opacity group-aria-hidden:opacity-0"
        onClick={() => setIsAccountOpen(false)}
      ></div>
      <div className="fixed bottom-0 left-0 top-0 flex w-full flex-col bg-background-sand transition-transform duration-300 group-aria-hidden:translate-x-[-100%] md:w-[420px]">
        <AccountHeader />
        <MainAccount />
      </div>
    </Transiton>
  );
}
