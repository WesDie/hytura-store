"use client";
import AccountHeader from "@/components/account/account-header";
import MainAccount from "@/components/account/main-account";
import { useAccountDrawer } from "@/components/context/account-drawer-context";
import Transiton from "@/components/utilities/transition";
import { useState, useEffect } from "react";

export default function AccountDrawer({
  isLoggedIn,
}: {
  isLoggedIn?: boolean;
}) {
  const { isAccountOpen, setIsAccountOpen } = useAccountDrawer();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      setIsAccountOpen(false);
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [isLoggedIn, setIsAccountOpen]);

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
        <Transiton transitonTime={300} state={isActive}>
          <MainAccount />
        </Transiton>

        <Transiton transitonTime={300} state={!isActive}>
          <div className="flex h-full w-full text-center transition-opacity group-aria-hidden:opacity-0">
            <p className="text-heading-3xs m-auto text-text-light-gray">
              Already logged in
            </p>
          </div>
        </Transiton>
      </div>
    </Transiton>
  );
}
