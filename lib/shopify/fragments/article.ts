import imageFragment from "./image";

const articleFragment = `
  fragment article on Article {
    id
    handle
    image {
      ...image
    }
    title
    contentHtml
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
