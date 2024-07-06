import productFragment from "./product";

export const customerFragment = `
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
          countryCode
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
      countryCode
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
          totalTax {
            amount
            currencyCode
          }
          currentSubtotalPrice {
            amount
            currencyCode
          }
          billingAddress{
            address1
            city
            country
            countryCode
            name
            zip
          }
          shippingAddress{
            address1
            city
            country
            countryCode
            name
            zip
          }
          lineItems(first: 10) {
            edges {
              node {
                quantity
                title
                variant {
                  title
                  product {
                    ...product
                  }
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
  ${productFragment}
`;

export const customerAddressFragment = `
  fragment customerAddress on MailingAddress {
    address1
    address2
    city
    company
    country
    countryCode
    firstName
    id
    lastName
    name
    phone
    province
    provinceCode
    zip
  }
`;
