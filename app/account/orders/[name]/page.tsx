"use client";
import SingleOrderOverview from "@/components/account/account-page/single-order-overview";
import { useCustomer } from "@/components/context/customer-context";
import Button from "@/components/elements/button";
import type { Order } from "@/lib/shopify/types";
import Link from "next/link";

export default function Order({ params }: { params: { name: string } }) {
  const { customer } = useCustomer();
  const order = customer?.orders.find(
    (order) => order.name === "#" + params.name,
  );

  if (!order)
    return (
      <div className="my-auto flex flex-col gap-2x p-4x">
        <h1 className="text-heading-md">Order not found</h1>
        <Link href="/account/orders">
          <Button variant="secondary" text={"Back to orders"}></Button>
        </Link>
      </div>
    );

  return <SingleOrderOverview order={order ?? ({} as Order)} />;
}
