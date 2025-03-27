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

export const getProductRecommendationsQuery = `
  query getProductRecommendations($productId: ID!, $intent: ProductRecommendationIntent!) {
    productRecommendations(productId: $productId, intent: $intent) {
      ...product
    }
  }
  ${productFragment}
`;
