import articleFragment from "./article";
import seoFragment from "./seo";

const blogFragment = `
  fragment blog on Blog {
    articles(first: 10) {
      nodes {
        ...article
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
