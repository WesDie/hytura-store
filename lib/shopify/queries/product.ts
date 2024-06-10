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

export const getSingleProductQuery = `
  query ($handle: String!) {  
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;
