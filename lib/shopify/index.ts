import { TAGS } from "@/lib/constants";

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
    query: `{
      products(first: 10, sortKey: TITLE) {
        edges {
          node {
            id
            handle
            title
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              nodes {
                id
                url
              }
            }
            variants(first: 1) {
              nodes {
                id
              }
            }
            media(first: 10) {
              nodes {
                ... on Video {
                  id
                  sources {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {},
  });
}

export async function getAllBlogsData() {
  return shopifyFetch({
    query: `{
      blogs(first: 10) {
        nodes {
          articles(first: 10) {
            nodes {
              id
              handle
              image {
                url
              }
              title
              content(truncateAt: 150)
              publishedAt
            }
          }
          title
          id
        }
      }
    }`,
    variables: {},
  });
}

export async function getSingleArticleData(id: string) {
  return shopifyFetch({
    query: `query ($id: ID!) {  
      article(id: $id) {
        handle
        content
        excerpt
        author {
          name
        }
        image {
          url
        }
        publishedAt
        title
      }
    }`,
    variables: {
      id,
    },
  });
}

export async function getAllCollections() {
  return shopifyFetch({
    query: `{
      collections(first: 10, sortKey: TITLE) {
        nodes {
          handle
          id
          title
          description
          products(first: 10) {
            nodes {
              id
              handle
              title
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 10) {
                nodes {
                  id
                  url
                }
              }
              media(first: 10) {
                nodes {
                  ... on Video {
                    id
                    sources {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {},
  });
}

export async function getCart(id: string) {
  return shopifyFetch({
    query: `query ($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    availableForSale
                    title
                    description
                    descriptionHtml
                    options {
                      id
                      name
                      values
                    }
                    priceRange {
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                    variants(first: 250) {
                      edges {
                        node {
                          id
                          title
                          availableForSale
                          selectedOptions {
                            name
                            value
                          }
                          price {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                    featuredImage {
                      url
                      altText
                      width
                      height
                    }
                    images(first: 20) {
                      edges {
                        node {
                          url
                          altText
                          width
                          height
                        }
                      }
                    }
                    seo {
                      description
                      title
                    }
                    tags
                    updatedAt
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
    }`,
    variables: {
      id,
    },
    tags: [TAGS.cart],
  });
}

export async function createCart(itemId: string, quantity: string) {
  return shopifyFetch({
    query: `
      mutation createCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            id
          }
        }
      }
    `,
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

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
) {
  return shopifyFetch({
    query: `
      mutation addCart($id: ID!, $lineItems: [CartLineInput!]!) {
        cartLinesAdd(cartId: $id, lines: $lineItems) {
          cart {
            id
            totalQuantity
            estimatedCost {
              totalAmount {
                amount
              }
            }
            lines(first: 10) {
              nodes {
                id
              }
            }
          }
        }
      }
    `,
    variables: {
      id: cartId,
      lineItems: lines,
    },
  });
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  return shopifyFetch({
    query: `
      mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            totalQuantity
            estimatedCost {
              totalAmount {
                amount
              }
            }
            lines(first: 10) {
              nodes {
                id
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId,
      lineIds,
    },
  });
}
