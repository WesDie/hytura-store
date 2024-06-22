"use client";
import { shopifyLogoutCustomer } from "@/lib/shopify/account/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountTopBar({ firstName }: { firstName: string }) {
  const router = useRouter();

  const logout = async () => {
    await shopifyLogoutCustomer();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2x pt-[96px]">
      <h1 className="text-heading-lg pl-4x">Welcome, {firstName}</h1>
      <div className="flex justify-between border-y border-stroke-gray px-4x py-2x">
        <div className="flex gap-2x">
          <Link href={"/account"} className="text-link-sm text-text-black">
            General info
          </Link>
          <Link
            href={"/account/orders"}
            className="text-link-sm text-text-light-gray"
          >
            Orders
          </Link>
        </div>
        <button
          onClick={() => logout()}
          className="text-link-sm text-text-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
