import { TAGS } from "@/lib/constants";
import { getCartQuery } from "./queries/cart";
import { getAllProductsQuery, getSingleProductQuery } from "./queries/product";
import { getAllBlogsQuery, getSingleArticleQuery } from "./queries/blog";
import {
  createCartMutation,
  updateCartMutation,
  addToCartMutation,
  removeFromCartMutation,
  createCartWithAccountMutation,
  cartUpdateIdentityMutation,
} from "./mutations/cart";
import { getMenuQuery } from "./queries/menu";
import { getAllCollectionsQuery } from "./queries/collection";
import {
  Cart,
  Collection,
  Connection,
  Image,
  Media,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyPageOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
  ShopifyArticleOperation,
  ShopifyBlogsOperation,
  ShopifyBlog,
  Article,
  Blog,
  ShopifyGetAccountTokenOperation,
  CustomerAccessToken,
  Customer,
  ShopifyGetCustomerOperation,
  ShopifySendPasswordResetEmailOperation,
  ShopifyCartUpdateIdentityOperation,
  ShopifyCustomerActivateOperation,
  ShopifyUpdateCustomerOperation,
  ShopifyMenuOperation,
  ShopifyCustomer,
  EditCustomer,
  ShopifyOrder,
} from "./types";
import { getPageQuery } from "./queries/page";
import {
  createCustomerAccessTokenMutation,
  customerActivateMutation,
  sendCustomerPasswordResetEmail,
  customerUpdateMutation,
} from "./mutations/account";
import { getCustomerQuery } from "./queries/account";

const domain = process.env.SHOPIFY_STORE_DOMAIN_URL || "";

export async function shopifyFetch<T>({
  cache = "no-store",
  query,
  variables,
  tags,
}: {
  cache?: RequestCache;
  query: string;
  variables?: object;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
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

    throw {
      error: error,
      query,
    };
  }
}

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

const reshapeMenu = (res: ShopifyMenuOperation): Menu[] => {
  return (
    res.data?.menu?.items.map(
      (item: {
        title: string;
        url: string;
        items: { title: string; url: string }[];
      }) => ({
        title: item.title,
        path: item.url
          .replace(domain, "")
          .replace("/collections", "/collection")
          .replace("/pages", "/page")
          .replace("/blogs", "/journal"),

        items: item.items.map((subItem: { title: string; url: string }) => ({
          title: subItem.title,
          path: subItem.url
            .replace(domain, "")
            .replace("/collections", "/collection")
            .replace("/pages", "/page")
            .replace("/blogs", "/journal"),
        })),
      }),
    ) || []
  );
};

const reshapeCollection = (collection: ShopifyCollection) => {
  if (!collection) {
    return undefined;
  }

  const { products, ...rest } = collection;

  return {
    ...rest,
    products: reshapeProducts(removeEdgesAndNodes(products)),
    path: `/search/${collection.handle}`,
  };
};

const reshapeCustomer = (customer: ShopifyCustomer) => {
  if (!customer) {
    return undefined;
  }

  const { addresses, orders, ...rest } = customer;

  return {
    ...rest,
    addresses: removeEdgesAndNodes(addresses),
    orders: reshapeOrders(removeEdgesAndNodes(orders)),
  };
};

const reshapeOrders = (orders: ShopifyOrder[]) => {
  const reshapedOrders = [];

  for (const order of orders) {
    if (order) {
      const reshapedOrder = reshapeOrder(order);

      if (reshapedOrder) {
        reshapedOrders.push(reshapedOrder);
      }
    }
  }

  return reshapedOrders;
};

const reshapeOrder = (order: ShopifyOrder) => {
  const { lineItems, ...rest } = order;

  return {
    ...rest,
    lineItems: removeEdgesAndNodes(lineItems),
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

const reshapeBlogs = (blogs: ShopifyBlog[]) => {
  const reshapedBlogs = [];

  for (const blog of blogs) {
    if (blog) {
      const reshapedBlog = reshapeBlog(blog);

      reshapedBlogs.push(reshapedBlog);
    }
  }

  return reshapedBlogs;
};

const reshapeBlog = (blog: ShopifyBlog) => {
  const { articles, ...rest } = blog;

  return {
    ...rest,
    articles: removeEdgesAndNodes(articles),
  };
};

const reshapeProduct = (product: ShopifyProduct) => {
  const { images, media, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
    media: reshapeMedia(media),
  };
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

const reshapeMedia = (media: Connection<Media>) => {
  const flattened = removeEdgesAndNodes(media);

  return flattened.map((media) => {
    return {
      ...media,
    };
  });
};

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

export async function getAllProducts(): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getAllProductsQuery,
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getAllBlogsData(): Promise<Blog[]> {
  const res = await shopifyFetch<ShopifyBlogsOperation>({
    query: getAllBlogsQuery,
  });

  return reshapeBlogs(removeEdgesAndNodes(res.body.data.blogs));
}

export async function getSingleArticleData(id: string): Promise<Article> {
  const res = await shopifyFetch<ShopifyArticleOperation>({
    query: getSingleArticleQuery,
    variables: {
      id,
    },
  });

  return res.body.data.article;
}

export async function getSingleProductData(handle: string): Promise<Product> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getSingleProductQuery,
    variables: {
      handle,
    },
  });

  return reshapeProduct(res.body.data.product);
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: {
      handle,
    },
  });

  return res.body.data.pageByHandle;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return reshapeMenu(res.body);
}

export async function getAllCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getAllCollectionsQuery,
  });

  return reshapeCollections(removeEdgesAndNodes(res.body.data.collections));
}

export async function getCart(id: string): Promise<Cart | null> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: {
      id,
    },
    tags: [TAGS.cart],
  });

  if (res.body.data.cart == null) {
    return null;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCustomer(
  token: string,
): Promise<Customer | undefined> {
  const res = await shopifyFetch<ShopifyGetCustomerOperation>({
    query: getCustomerQuery,
    variables: {
      customerAccessToken: token,
    },
  });

  return reshapeCustomer(res.body.data.customer);
}

export async function createCart(
  itemId: string,
  quantity: string,
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    variables: {
      cartInput: {
        lineItems: [
          {
            quantity: parseInt(quantity),
            merchandiseId: itemId,
          },
        ],
      },
    },
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function createCartWithAccount(
  itemId: string,
  quantity: string,
  accountToken: string,
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartWithAccountMutation,
    variables: {
      customerAccessToken: accountToken,
      cartInput: {
        lineItems: [
          {
            quantity: parseInt(quantity),
            merchandiseId: itemId,
          },
        ],
      },
    },
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function updateCartIdentity(
  cartId: string,
  customerAccessToken: string,
) {
  const res = await shopifyFetch<ShopifyCartUpdateIdentityOperation>({
    query: cartUpdateIdentityMutation,
    variables: {
      cartId,
      customerAccessToken,
    },
  });

  return reshapeCart(res.body.data.cartBuyerIdentityUpdate.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: updateCartMutation,
    variables: {
      cartId,
      lines,
    },
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      id: cartId,
      lineItems: lines,
    },
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function createCustomerToken(
  email: string,
  password: string,
): Promise<CustomerAccessToken> {
  const res = await shopifyFetch<ShopifyGetAccountTokenOperation>({
    query: createCustomerAccessTokenMutation,
    variables: {
      email,
      password,
    },
  });

  return res.body.data.customerAccessTokenCreate;
}

export async function customerSendPasswordResetEmail(email: string) {
  const res = await shopifyFetch<ShopifySendPasswordResetEmailOperation>({
    query: sendCustomerPasswordResetEmail,
    variables: {
      email,
    },
  });

  return res.body.data.customerRecover;
}

export async function customerActivateAccount(
  id: string,
  activationToken: string,
  password: string,
) {
  const res = await shopifyFetch<ShopifyCustomerActivateOperation>({
    query: customerActivateMutation,
    variables: {
      id,
      activationToken,
      password,
    },
  });

  return res.body.data.customerActivate;
}

export async function updateCustomer(customer: EditCustomer, token: string) {
  const res = await shopifyFetch<ShopifyUpdateCustomerOperation>({
    query: customerUpdateMutation,
    variables: {
      customer,
      customerAccessToken: token,
    },
  });

  return res.body.data.customerUpdate;
}
