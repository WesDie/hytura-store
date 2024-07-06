import { customerFragment } from "../fragments/customer";

export const getCustomerQuery = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...customer
    }
  }
  ${customerFragment}
`;
