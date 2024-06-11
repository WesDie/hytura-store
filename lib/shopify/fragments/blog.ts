import articleFragment from "./article";
import seoFragment from "./seo";

const blogFragment = `
  fragment blog on Blog {
    articles(first: 10) {
      edges {
        node {
          ...article
        }
      }
    }
    id
    handle
    title
    onlineStoreUrl
    seo {
      ...seo
    }
  }
  ${seoFragment}
  ${articleFragment}
`;

export default blogFragment;
