const customerFragment = `
  fragment customer on Customer {
    acceptsMarketing
    createdAt
    displayName
    email
    firstName
    id
    lastName
    numberOfOrders
    phone
    updatedAt
    addresses(first: 10) {
      edges {
        node {
          address1
          address2
          city
          company
          country
          firstName
          id
          lastName
          name
          phone
          province
          provinceCode
          zip
        }
      }
    }
    defaultAddress {
      address1
      address2
      city
      company
      country
      firstName
      id
      lastName
      name
      phone
      province
      provinceCode
      zip
    }
    orders(first: 10) {
      edges {
        node {
          statusUrl
          processedAt
          phone
          orderNumber
          name
          id
          fulfillmentStatus
          financialStatus
          email
          edited
          customerUrl
          customerLocale
          currencyCode
          canceledAt
          cancelReason
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            edges {
              node {
                quantity
                title
                variant {
                  title
                }
                originalTotalPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default customerFragment;
