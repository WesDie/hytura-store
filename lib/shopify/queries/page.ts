import pageFragment from "../fragments/page";

export const getPageQuery = `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;
