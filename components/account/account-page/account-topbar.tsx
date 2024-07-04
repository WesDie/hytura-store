"use client";
import { shopifyLogoutCustomer } from "../actions";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../elements/button";
import { useState, useEffect } from "react";

export default function AccountTopBar({ firstName }: { firstName: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("/account/general-information");

  const logout = async () => {
    await shopifyLogoutCustomer();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-2x pt-[96px]">
      <h1 className="text-heading-lg pl-4x">
        Welcome{firstName && `, ${firstName}`}
      </h1>
      <div className="flex justify-between border-y border-stroke-gray px-4x py-2x">
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
        </div>
        <Button text="Logout" variant="link" onclick={() => logout()} />
      </div>
    </div>
  );
}
