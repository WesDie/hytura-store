import imageFragment from "./image";

const articleFragment = `
  fragment article on Article {
    id
    handle
    image {
      ...image
    }
    title
    content
    publishedAt
    excerpt
    author {
      name
    }
  }
  ${imageFragment}
`;

export default articleFragment;
