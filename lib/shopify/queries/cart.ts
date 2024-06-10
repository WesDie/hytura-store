import cartFragment from "../fragments/cart";

export const getCartQuery = `
  query getCart($id: ID!) {
    cart(id: $id) {
      ...cart
    }
  }
  ${cartFragment}
`;
