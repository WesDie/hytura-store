// @ts-nocheck
"use server";

import { cookies } from "next/headers";
import { createCart, getCart, addToCart, removeFromCart } from "@/lib/shopify";
import { TAGS } from "@/lib/constants";
import { revalidateTag } from "next/cache";

export async function addItem(selectedVariantId: string) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart(selectedVariantId, 1);
    cartId = cart.body.data.cartCreate.cart.id;
    if (cartId) {
      cookies().set("cartId", cartId as string);
    }
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(lineId: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function getCartData() {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return [];
  }

  const cart = await getCart(cartId);
  return cart.body.data;
}
