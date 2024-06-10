import productFragment from "./product";

const collectionFragment = `
  fragment collection on Collection {
    description
    handle
    id
    title
    updatedAt
    products(first: 10) {
      nodes {
        ...product
      }
    }
    seo {
      description
      title
    }
  }
  ${productFragment}
`;

export default collectionFragment;
