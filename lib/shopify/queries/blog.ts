import blogFragment from "../fragments/blog";
import articleFragment from "../fragments/article";

export const getAllBlogsQuery = `
  {
    blogs(first: 10) {
      edges {
        node {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
`;

export const getSingleArticleQuery = `
  query ($id: ID!) {  
    article(id: $id) {
      ...article
    }
  }
  ${articleFragment}
`;
