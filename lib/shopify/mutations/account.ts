import {
  customerFragment,
  customerAddressFragment,
} from "../fragments/customer";

export const createCustomerAccessTokenMutation = `
  mutation customerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: {email: $email, password: $password}) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const sendCustomerPasswordResetEmail = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        message
      }
      userErrors {
        field
        message
      }
    } 
  }
`;

export const customerActivateMutation = `
  mutation customerActivate($id: ID!, $password: String!, $activationToken: String!) {
    customerActivate(input: { activationToken: $activationToken, password: $password }, id: $id) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    } 
  }
`;

export const customerUpdateMutation = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        ...customer
      }
      customerUserErrors {
        message
      }
    }
  }
  ${customerFragment}
`;

export const customerAddressUpdateMutation = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        ...customerAddress
      }
      customerUserErrors {
        message
      }
    }
  }
  ${customerAddressFragment}
`;

export const customerAddressDeleteMutation = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        message
      }
    }
  }
`;

export const customerAddressCreateMutation = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        ...customerAddress
      }
      customerUserErrors {
        message
      }
    }
  }
  ${customerAddressFragment}
`;
