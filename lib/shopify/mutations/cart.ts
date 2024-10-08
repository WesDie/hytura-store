import cartFragment from "../fragments/cart";

export const createCartMutation = `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate (input: {lines : $lineItems}) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartWithAccountMutation = `
  mutation createCart($lineItems: [CartLineInput!], $customerAccessToken: String!) {
    cartCreate (input: {lines : $lineItems, buyerIdentity: {customerAccessToken: $customerAccessToken}}) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const cartUpdateIdentityMutation = `
  mutation updateCartIdentity($cartId: ID!, $customerAccessToken: String!) {
    cartBuyerIdentityUpdate(buyerIdentity: {customerAccessToken: $customerAccessToken}, cartId: $cartId) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const updateCartMutation = `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const addToCartMutation = `
  mutation addCart($id: ID!, $lineItems: [CartLineInput!]!) {
    cartLinesAdd(cartId: $id, lines: $lineItems) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
