import imageFragment from "./image";
import seoFragment from "./seo";
import metafieldFragment from "./metafield";

const productFragment = `
  fragment product on Product {
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
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    media(first: 10) {
      edges {
        node {
          ... on Video {
            id
            sources {
              url
            }
          }
        }
      }
    }
    metafields(identifiers: [
      {namespace: "custom", key: "specifications"}
      {namespace: "shopify", key: "package-type"}
    ]) {
      ...metafield
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
  ${metafieldFragment}
`;

export default productFragment;
