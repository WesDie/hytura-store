// @ts-nocheck
"use server";

import { cookies } from "next/headers";
import {
  createCart,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  createCartWithAccount,
} from "@/lib/shopify";
import { TAGS } from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { Cart } from "@/lib/shopify/types";

export async function addItem(selectedVariantId: string, quantity: number = 1) {
  let cartId = cookies().get("cartId")?.value;
  let accountToken = cookies().get("customerAccessToken")?.value;

  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    if (!accountToken) {
      cart = await createCart(selectedVariantId, 1);
    } else {
      cart = await createCartWithAccount(selectedVariantId, 1, accountToken);
    }
    cartId = cart.id;
    if (cartId) {
      cookies().set("cartId", cartId);
    }
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: quantity },
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

export async function updateItemQuantity(payload: {
  lineId: string;
  variantId: string;
  quantity: number;
}) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);

    revalidateTag(TAGS.cart);
    return "Item quantity updated";
  } catch (e) {
    return "Error updating item quantity";
  }
}

export async function getCartData(): Promise<Cart> {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return [];
  }

  const cart = await getCart(cartId);
  return cart;
}
