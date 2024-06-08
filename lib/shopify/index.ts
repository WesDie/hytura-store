import { unstable_noStore as noStore } from "next/cache";

export async function shopifyFetch({
  query,
  variables,
}: {
  query: string;
  variables: any;
}) {
  noStore();
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
      collections(first: 10) {
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
