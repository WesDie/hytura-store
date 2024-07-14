export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    price: {
      amount: string;
    };
    product: Product;
  };
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  products: Product[];
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Media = {
  id: string;
  sources: Source[];
};

export type Menu = {
  title: string;
  path: string;
  items: MenuItem[];
};

export type MenuItem = {
  title: string;
  path: string;
};

export type Source = {
  url: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type CustomerAccessToken = {
  customerAccessToken: {
    accessToken: string;
  };
  customerUserErrors: {
    message: string;
  }[];
};

export type EditCustomer = {
  acceptsMarketing?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
};

export type Customer = {
  firstName: string;
  createdAt?: string;
  acceptsMarketing: boolean;
  displayName?: string;
  email: string;
  state?: string;
  id?: string;
  lastName: string;
  numberOfOrders?: number;
  updatedAt?: string;
  tags?: string[];
  phone: string;
  addresses: Address[];
  defaultAddress?: Address;
  orders: Order[];
};

export type Address = {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  countryCode: string;
  firstName: string;
  id: string;
  lastName: string;
  name: string;
  phone: string;
  province: string;
  provinceCode: string;
  zip: string;
};

export type Order = {
  statusUrl: string;
  processedAt: string;
  phone: string;
  orderNumber: string;
  name: string;
  id: string;
  fulfillmentStatus: string;
  financialStatus: string;
  email: string;
  edited: boolean;
  customerUrl: string;
  customerLocale: string;
  currencyCode: string;
  canceledAt: string;
  cancelReason: string;
  totalPrice: Money;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: OrderLineItem[];
  currentSubtotalPrice: Money;
  totalTax: Money;
};

export type ShopifyOrder = {
  statusUrl: string;
  processedAt: string;
  phone: string;
  orderNumber: string;
  name: string;
  id: string;
  fulfillmentStatus: string;
  financialStatus: string;
  email: string;
  edited: boolean;
  customerUrl: string;
  customerLocale: string;
  currencyCode: string;
  canceledAt: string;
  cancelReason: string;
  totalPrice: Money;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: Connection<ShopifyOrderLineItem>;
  currentSubtotalPrice: Money;
  totalTax: Money;
};

export type OrderLineItem = {
  quantity: number;
  title: string;
  variant: {
    title: string;
    product: Product;
  };
  originalTotalPrice: Money;
};

export type Product = Omit<ShopifyProduct, "variants" | "images" | "media"> & {
  variants: ProductVariant[];
  images: Image[];
  media: Media[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type Blog = {
  handle: string;
  id: string;
  title: string;
  articles: Article[];
  seo: SEO;
};

export type Article = {
  author: {
    name: string;
  };
  image: {
    altText: string;
    url: string;
    width: number;
    height: number;
  };
  content: string;
  excerpt: string;
  handle: string;
  id: string;
  publishedAt: string;
  title: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  products: Connection<ShopifyProduct>;
};

export type ShopifyCustomer = {
  firstName: string;
  createdAt?: string;
  acceptsMarketing: boolean;
  displayName?: string;
  email: string;
  id?: string;
  lastName: string;
  numberOfOrders?: number;
  updatedAt?: string;
  tags?: string[];
  phone: string;
  addresses: Connection<Address>;
  defaultAddress?: Address;
  orders: Connection<Order>;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  media: Connection<Media>;
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyBlog = {
  handle: string;
  id: string;
  title: string;
  articles: Connection<Article>;
  seo: SEO;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyOrderLineItem = {
  quantity: number;
  title: string;
  variant: {
    title: string;
    product: ShopifyProduct;
  };
  originalTotalPrice: Money;
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyCartUpdateIdentityOperation = {
  data: {
    cartBuyerIdentityUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    customerAccessToken: string;
  };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyGetAccountTokenOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
      };
      customerUserErrors: {
        message: string;
      }[];
    };
  };
  variables: {
    email: string;
    password: string;
  };
};

export type ShopifyCustomerActivateOperation = {
  data: {
    customerActivate: {
      customerAccessToken: {
        accessToken: string;
      };
      customerUserErrors: {
        message: string;
      }[];
    };
  };
  variables: {
    id: string;
    password: string;
    activationToken: string;
  };
};

export type ShopifySendPasswordResetEmailOperation = {
  data: {
    customerRecover: {
      customerUserErrors: {
        message: string;
      }[];
      userErrors: {
        field: string;
        message: string;
      }[];
    };
  };
  variables: {
    email: string;
  };
};

export type ShopifyGetCustomerOperation = {
  data: {
    customer: ShopifyCustomer;
  };
  variables: {
    customerAccessToken: string;
  };
};

export type ShopifyUpdateCustomerOperation = {
  data: {
    customerUpdate: {
      customer: Customer;
      customerUserErrors: {
        message: string;
      }[];
    };
  };
  variables: {
    customer: {
      acceptsMarketing?: boolean;
      email?: string;
      firstName?: string;
      lastName?: string;
      password?: string;
      phone?: string;
    };
    customerAccessToken: string;
  };
};

export type ShopifyUpdateCustomerAddressOperation = {
  data: {
    customerAddressUpdate: {
      customer: Customer;
      customerUserErrors: {
        message: string;
      }[];
    };
  };
  variables: {
    address: {
      address1: string;
      address2: string;
      city: string;
      company: string;
      country: string;
      countryCode: string;
      firstName: string;
      lastName: string;
      phone: string;
      province: string;
      zip: string;
    };
    customerAccessToken: string;
    id: string;
  };
};

export type ShopifyCreateCustomerAddressOperation = {
  data: {
    customerAddressCreate: {
      customerAddress: Address;
      customerUserErrors: {
        message: string;
      }[];
    };
  };
  variables: {
    address: {
      address1: string;
      address2: string;
      city: string;
      company: string;
      country: string;
      countryCode: string;
      firstName: string;
      lastName: string;
      phone: string;
      province: string;
      zip: string;
    };
    customerAccessToken: string;
  };
};

export type ShopifyDeleteCustomerAddressOperation = {
  data: {
    customerAddressDelete: {
      customerUserErrors: {
        message: string;
      }[];
    };
  };
  variables: {
    customerAccessToken: string;
    id: string;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
        items: {
          title: string;
          url: string;
        }[];
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
};

export type ShopifyArticleOperation = {
  data: {
    article: Article;
  };
};

export type ShopifyBlogsOperation = {
  data: {
    blogs: Connection<ShopifyBlog>;
  };
};
