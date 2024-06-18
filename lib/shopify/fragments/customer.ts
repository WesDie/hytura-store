const customerFragment = `
  fragment customer on Customer {
    firstName
    createdAt
    acceptsMarketing
    displayName
    email
    id
    lastName
    numberOfOrders
    updatedAt
    tags
    phone
  }
`;

export default customerFragment;
