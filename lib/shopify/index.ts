import { TAGS } from "@/lib/constants";
import { getCartQuery } from "./queries/cart";
import { getAllProductsQuery } from "./queries/product";
import { getAllBlogsQuery, getSingleArticleQuery } from "./queries/blog";
import {
  createCartMutation,
  updateCartMutation,
  addToCartMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getAllCollectionsQuery } from "./queries/collection";

export async function shopifyFetch({
  cache = "no-store",
  query,
  variables,
  tags,
}: {
  cache?: RequestCache;
  query: string;
  variables: any;
  tags?: string[];
}) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  try {
    if (!endpoint) {
      throw new Error("Endpoint is not defined");
    } else if (!key) {
      throw new Error("Key is not defined");
    }

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}

export async function getAllProducts() {
  return shopifyFetch({
    query: getAllProductsQuery,
    variables: {},
  });
}

export async function getAllBlogsData() {
  return shopifyFetch({
    query: getAllBlogsQuery,
    variables: {},
  });
}

export async function getSingleArticleData(id: string) {
  return shopifyFetch({
    query: getSingleArticleQuery,
    variables: {
      id,
    },
  });
}

export async function getAllCollections() {
  return shopifyFetch({
    query: getAllCollectionsQuery,
    variables: {},
  });
}

export async function getCart(id: string) {
  return shopifyFetch({
    query: getCartQuery,
    variables: {
      id,
    },
    tags: [TAGS.cart],
  });
}

export async function createCart(itemId: string, quantity: string) {
  return shopifyFetch({
    query: createCartMutation,
    variables: {
      cartInput: {
        lines: [
          {
            quantity: parseInt(quantity),
            merchandiseId: itemId,
          },
        ],
      },
    },
  });
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
) {
  return shopifyFetch({
    query: updateCartMutation,
    variables: {
      cartId,
      lines,
    },
  });
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
) {
  return shopifyFetch({
    query: addToCartMutation,
    variables: {
      id: cartId,
      lineItems: lines,
    },
  });
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  return shopifyFetch({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
  });
}
