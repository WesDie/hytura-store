"use client";
import { shopifyLogoutCustomer } from "../actions";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../elements/button";
import { useState, useEffect, useCallback } from "react";

export default function AccountTopBar({ firstName }: { firstName: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  const logout = async () => {
    await shopifyLogoutCustomer();
    router.push("/");
    router.refresh();
  };

  const setNewTitle = useCallback(() => {
    if (pathname == "/account/general-information")
      return `Welcome${firstName && `, ${firstName}`}`;
    else if (pathname.includes("/account/orders/")) return "Order details";
    else if (pathname.includes("/account/orders")) return "Order overview";
    else if (pathname == "/account/general-information/address/new")
      return "Add Address";
    else if (pathname.includes("/general-information/address/"))
      return "Edit Address";
  }, [pathname, firstName]);

  const [title, setTitle] = useState(setNewTitle());

  useEffect(() => {
    setActiveTab(pathname);
    setTitle(setNewTitle());
  }, [pathname, setNewTitle]);

  return (
    <div className="flex flex-col gap-2x pt-5x md:pt-[96px]">
      <h1 className="text-heading-lg pl-2x md:pl-4x">{title}</h1>
      <div className="flex justify-between border-y border-stroke-gray px-2x py-2x md:px-4x">
        <div className="flex gap-2x">
          <Link
            href={"/account/general-information"}
            className={`text-link-sm ${activeTab === "/account/general-information" ? "text-text-black" : "text-text-light-gray"}`}
          >
            General info
          </Link>
          <Link
            href={"/account/orders"}
            className={`text-link-sm ${activeTab === "/account/orders" ? "text-text-black" : "text-text-light-gray"}`}
          >
            Orders
          </Link>
          {activeTab.includes("/account/orders/") && (
            <Link href={pathname} className="text-link-sm text-text-black">
              Order #{pathname.split("/").pop()}
            </Link>
          )}
          {activeTab.includes("/general-information/address/") && (
            <Link href={pathname} className="text-link-sm text-text-black">
              {pathname.split("/").pop() == "new"
                ? "Add address"
                : "Edit address"}
            </Link>
          )}
        </div>
        <Button text="Logout" variant="link" onclick={() => logout()} />
      </div>
    </div>
  );
}
