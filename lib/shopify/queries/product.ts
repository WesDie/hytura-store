import productFragment from "../fragments/product";

export const getAllProductsQuery = `
  {
    products(first: 10, sortKey: TITLE) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;
