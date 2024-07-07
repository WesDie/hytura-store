"use client";
import { Order } from "@/lib/shopify/types";
import Link from "next/link";

export default function SingleOrderOverview({ order }: { order: Order }) {
  const orderListItemClass =
    "text-body-sm w-full text-center text-text-light-gray";
  const orderHeaderItemClass = "text-heading-3xs w-full text-center";

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="flex w-full flex-col gap-4x p-2x pb-5x md:p-4x">
        <div className="flex flex-col gap-3x">
          <h2 className="text-heading-sm">Summary</h2>
          <div className="flex gap-3x">
            <div className="flex flex-col gap-1x">
              <h2 className="text-heading-3xs">Date:</h2>
              <p className="text-body-sm text-text-light-gray">
                {order.processedAt.split("T")[0]}
              </p>
            </div>
            <div className="flex flex-col gap-1x">
              <h2 className="text-heading-3xs">ID:</h2>
              <p className="text-body-sm text-text-light-gray">{order.name}</p>
            </div>
            <div className="flex flex-col gap-1x">
              <h2 className="text-heading-3xs">Status:</h2>
              <p className="text-body-sm text-text-light-gray">
                {order.fulfillmentStatus}
              </p>
            </div>
            <div className="flex flex-col gap-1x">
              <h2 className="text-heading-3xs">Payment status:</h2>
              <p className="text-body-sm text-text-light-gray">
                {order.financialStatus}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2x">
          <div className="flex w-full flex-col">
            <div className="flex w-full border-b border-stroke-light-gray px-1x py-2x">
              <p className="text-heading-3xs w-full">Product</p>
              <p className={orderHeaderItemClass}>Price</p>
              <p className={orderHeaderItemClass}>Amount</p>
              <p className={`${orderHeaderItemClass} text-end`}>Total cost</p>
            </div>
            {order.lineItems.map((item, index) => (
              <div
                key={index}
                className="flex w-full border-b border-stroke-light-gray px-1x py-2x"
              >
                <Link
                  href={`/product/${item.variant.product.handle}`}
                  className="button-link w-full"
                >
                  {item.title}
                </Link>
                <p className={orderListItemClass}>
                  {item.originalTotalPrice.amount}{" "}
                  {item.originalTotalPrice.currencyCode}
                </p>
                <p className={orderListItemClass}>{item.quantity}</p>
                <p className={`${orderListItemClass} text-end`}>
                  {Number(item.originalTotalPrice.amount) * item.quantity}{" "}
                  {item.originalTotalPrice.currencyCode}
                </p>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex w-full border-b border-stroke-light-gray px-1x py-2x">
              <p className="text-heading-3xs w-full">Subtotal</p>
              <p className={orderHeaderItemClass}>Tax</p>
              <p className={orderHeaderItemClass}>Total</p>
            </div>
            <div className="flex w-full border-b border-stroke-light-gray px-1x py-2x">
              <p className={`${orderListItemClass} !text-left`}>
                {order.currentSubtotalPrice.amount}{" "}
                {order.currentSubtotalPrice.currencyCode}
              </p>
              <p className={orderListItemClass}>
                {order.totalTax.amount !== "0.0"
                  ? `${order.totalTax.amount} ${order.totalTax.currencyCode}`
                  : "Included"}
              </p>
              <p className={orderListItemClass}>
                {order.totalPrice.amount} {order.totalPrice.currencyCode}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-2x">
          <h2 className="text-heading-xs">Order note</h2>
          <p className="text-body-sm max-w-[400px] text-text-light-gray"></p>
        </div> */}
      </div>
      <div className="w-full border-t border-solid border-stroke-light-gray md:w-[30%] md:border-l md:border-t-0">
        <div className="flex flex-col gap-1x border-b border-solid border-stroke-light-gray px-2x py-2x md:px-4x md:py-3x">
          <h2 className="text-heading-xs">Shipping Address</h2>
          <div className="flex flex-col gap-1x py-2x">
            <h3 className="text-heading-2xs text-text-black">
              {order.shippingAddress.address1}
            </h3>
            <li className="text-body-sm flex flex-col text-text-light-gray">
              <ul>{order.shippingAddress.name}</ul>
              <ul>{order.shippingAddress.address1}</ul>
              <ul>
                {order.shippingAddress.zip} {order.billingAddress.city}
              </ul>
              <ul>{order.shippingAddress.country}</ul>
            </li>
          </div>
        </div>
        <div className="flex flex-col gap-1x px-2x py-2x md:px-4x md:py-3x">
          <h2 className="text-heading-xs">Billing Address</h2>
          <div className="flex flex-col gap-1x py-2x">
            <h3 className="text-heading-2xs text-text-black">
              {order.billingAddress.address1}
            </h3>
            <li className="text-body-sm flex flex-col text-text-light-gray">
              <ul>{order.billingAddress.name}</ul>
              <ul>{order.billingAddress.address1}</ul>
              <ul>
                {order.billingAddress.zip} {order.billingAddress.city}
              </ul>
              <ul>{order.billingAddress.country}</ul>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
