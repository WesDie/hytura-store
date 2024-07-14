"use client";
import { Customer } from "@/lib/shopify/types";
import Link from "next/link";

export default function OrderOverview({ customer }: { customer: Customer }) {
  const orderListItemClass =
    "text-body-sm w-full text-center text-text-light-gray";
  const orderHeaderItemClass = "text-heading-3xs w-full text-center";

  return (
    <div className="flex w-full flex-col p-2x pt-2x md:p-4x">
      <div className="flex w-full border-b border-stroke-light-gray px-1x py-2x">
        <p className="text-heading-3xs w-full">Order ID</p>
        <p className={`${orderHeaderItemClass} hidden md:block`}>
          Payment status
        </p>
        <p className={`${orderHeaderItemClass} hidden md:block`}>
          Fulfillment status
        </p>
        <p className={orderHeaderItemClass}>Date</p>
        <p className={`${orderHeaderItemClass} text-end`}>Items | Price</p>
      </div>
      {customer.orders.length === 0 && (
        <p className="text-body-sm py-2x text-center text-text-light-gray">
          No orders found
        </p>
      )}
      {customer.orders.map((order) => (
        <div
          key={order.id}
          className="flex w-full border-b border-stroke-light-gray px-1x py-2x"
        >
          <Link
            href={"/account/orders/" + order.orderNumber}
            className="button-link w-full"
          >
            #{order.orderNumber}
          </Link>
          <p className={`${orderListItemClass} hidden md:block`}>
            {order.financialStatus}
          </p>
          <p className={`${orderListItemClass} hidden md:block`}>
            {order.fulfillmentStatus}
          </p>
          <p className={orderListItemClass}>
            {order.processedAt.split("T")[0]}
          </p>
          <p className={`${orderListItemClass} text-end`}>
            {order.lineItems.length}{" "}
            {order.lineItems.length === 1 ? "Item" : "Items"} |{" "}
            {order.totalPrice.amount} {order.totalPrice.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}
