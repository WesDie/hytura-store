import collectionFragment from "../fragments/collection";

export const getAllCollectionsQuery = `
  {
    collections(first: 10, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;
