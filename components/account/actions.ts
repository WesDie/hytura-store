"use server";

import { cookies } from "next/headers";
import {
  createCustomerToken,
  customerSendPasswordResetEmail,
  customerActivateAccount,
  updateCartIdentity,
  updateCustomer,
  getCustomer,
  updateCustomerAddress,
  deleteCustomerAddress,
  createCustomerAddress,
} from "@/lib/shopify/index";
import { createCustomer } from "@/lib/shopify/customer/actions";
import { Customer, EditCustomer } from "@/lib/shopify/types";
import { revalidateTag } from "next/cache";
import { TAGS } from "@/lib/constants";

export async function shopifyCreateCustomer(
  prevState: any,
  formData: FormData,
) {
  const errors: any = {};
  const requiredFields = ["first_name", "last_name", "email", "password"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    errors.accepts_terms = formData.get("accepts_terms") !== "on";
    errors.base = ["Please fill in the required fields"];

    return {
      message: errors,
    };
  }

  if (formData.get("accepts_terms") !== "on") {
    return {
      message: {
        base: ["Please accept the terms and conditions"],
        accepts_terms: true,
      },
    };
  }

  return createCustomer(formData);
}

export async function shopifyLoginCustomer(
  prevState: any,
  formData: FormData,
): Promise<{ message: any }> {
  const errors: any = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== null && password !== null) {
    const res = await createCustomerToken(email, password);

    if (res.customerAccessToken?.accessToken) {
      cookies().set("customerAccessToken", res.customerAccessToken.accessToken);

      let cartId = cookies().get("cartId")?.value;

      if (cartId) {
        updateCartIdentity(cartId, res.customerAccessToken.accessToken);
      }

      return { message: { success: "Logged in successsfully" } };
    } else if (res.customerUserErrors) {
      if (res.customerUserErrors[0].message === "Unidentified customer") {
        return { message: { base: ["Invalid email or password"] } };
      }

      return { message: res.customerUserErrors[0].message };
    }
  }

  return { message: "Somthing went wrong" };
}

export async function shopifySendPasswordResetEmail(
  prevState: any,
  formData: FormData,
): Promise<{ message: any }> {
  const errors: any = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const email = formData.get("email") as string;

  if (email !== null) {
    const res = await customerSendPasswordResetEmail(email);

    if (res.customerUserErrors) {
      return { message: { error: res.customerUserErrors[0].message } };
    } else if (res.userErrors) {
      return { message: { error: res.userErrors[0].message } };
    }

    return { message: { success: "Email sent successsfully" } };
  }

  return { message: { error: "Somthing went wrong" } };
}

export async function shopifyLogoutCustomer() {
  cookies().delete("customerAccessToken");

  return { message: { success: "Logout success" } };
}

export async function shopifyActivateCustomer(
  prevState: any,
  formData: FormData,
): Promise<{ message: any }> {
  const errors: any = {};
  const requiredFields = ["password", "confirm_password"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;
  const activationToken = formData.get("activationToken") as string;
  const id = ("gid://shopify/Customer/" + formData.get("id")) as string;

  if (password !== confirmPassword) {
    return { message: { confirm_password: ["Does not match"] } };
  }

  if (password !== null && activationToken !== null && id !== null) {
    const res = await customerActivateAccount(id, activationToken, password);

    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      return { message: { base: res.customerUserErrors[0].message } };
    } else if (res.customerAccessToken) {
      cookies().set("customerAccessToken", res.customerAccessToken.accessToken);

      let cartId = cookies().get("cartId")?.value;

      if (cartId) {
        updateCartIdentity(cartId, res.customerAccessToken.accessToken);
      }

      return { message: { success: "Activated customer successfully" } };
    }
  }

  return { message: "Somthing went wrong" };
}

export async function shopifySubscribeMarketing(
  prevState: any,
  formData: FormData,
): Promise<{ message: any }> {
  const errors: any = {};
  const requiredFields = ["email"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  formData.set("email_marketing_status", "on");
  formData.set("new_email_marketing_status", "on");

  const customerToken = cookies().get("customerAccessToken")?.value;

  if (customerToken) {
    const customer = await getCustomer(customerToken);

    if (customer && customer.email !== formData.get("email")) {
      return await createCustomer(formData, true);
    }

    const updateRes = await shopifyUpdateCustomer(null, formData);
    if (updateRes.message.success.length > 0) {
      return {
        message: { success: "Subscribed to marketing successfully" },
      };
    }
  }

  return await createCustomer(formData, true);
}

export async function shopifyUpdateCustomer(
  prevState: any,
  formData: FormData,
  customer?: Customer,
): Promise<{ message: any }> {
  const customerToken = cookies().get("customerAccessToken")?.value;

  if (!customerToken) {
    return { message: { base: ["Unauthorized"] } };
  }

  if (!customer) {
    customer = await getCustomer(customerToken);
  }

  if (!customer) {
    return { message: { base: ["Unauthorized"] } };
  }

  const errors: any = {};
  const requiredFields = [
    "new_first_name",
    "new_last_name",
    "new_email",
    "first_name",
    "last_name",
    "email",
  ];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const newCustomerData: EditCustomer = {
    acceptsMarketing:
      formData.get("new_email_marketing_status") === "on" ||
      customer.acceptsMarketing,
    firstName: (formData.get("new_first_name") as string) || customer.firstName,
    lastName: (formData.get("new_last_name") as string) || customer.lastName,
    email: (formData.get("new_email") as string) || customer.email,
    phone: (formData.get("new_phone") as string) || customer.phone,
  };

  const res = await updateCustomer(newCustomerData, customerToken);
  if (res.customerUserErrors && res.customerUserErrors.length > 0) {
    if (res.customerUserErrors[0].message === "Enter a valid phone number") {
      return { message: { new_phone: ["is not valid"] } };
    }
    return { message: { base: res.customerUserErrors[0].message } };
  }

  revalidateTag(TAGS.customer);

  return { message: { success: "Updated customer successfully" } };
}

export async function ShopifyUpdateCustomerAddress(
  prevState: any,
  formData: FormData,
  customer?: Customer,
): Promise<{ message: any }> {
  const customerToken = cookies().get("customerAccessToken")?.value;

  if (!customerToken) {
    return { message: { base: ["Unauthorized"] } };
  }

  if (!customer) {
    customer = await getCustomer(customerToken);
  }

  if (!customer) {
    return { message: { base: ["Unauthorized"] } };
  }

  const errors: any = {};
  const requiredFields = [
    "first_name",
    "last_name",
    "address1",
    "city",
    "country",
    "zip",
  ];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const address: any = {
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    city: formData.get("city"),
    company: formData.get("company"),
    country: formData.get("country"),
    firstName: formData.get("first_name"),
    lastName: formData.get("last_name"),
    phone: formData.get("phone"),
    zip: formData.get("zip"),
  };

  const id = formData.get("id") as string;

  if (!id) {
    return { message: { base: ["Address not found"] } };
  }

  const res = await updateCustomerAddress(id, address, customerToken);

  if (res.customerUserErrors && res.customerUserErrors.length > 0) {
    if (
      res.customerUserErrors[0].message === "Country is not a valid country"
    ) {
      return { message: { country: ["is not valid"] } };
    }

    return { message: { base: res.customerUserErrors[0].message } };
  }

  revalidateTag(TAGS.customer);

  return { message: { success: "Updated address successfully" } };
}

export async function ShopifyDeleteCustomerAddress(
  prevState: any,
  formData: FormData,
  customer?: Customer,
): Promise<{ message: any }> {
  const customerToken = cookies().get("customerAccessToken")?.value;

  if (!customerToken) {
    return { message: { base: ["Unauthorized"] } };
  }

  if (!customer) {
    customer = await getCustomer(customerToken);
  }

  if (!customer) {
    return { message: { base: ["Unauthorized"] } };
  }

  const id = formData.get("id") as string;

  if (!id) {
    return { message: { base: ["Address not found"] } };
  }

  const res = await deleteCustomerAddress(id, customerToken);

  if (res.customerUserErrors && res.customerUserErrors.length > 0) {
    return { message: { base: res.customerUserErrors[0].message } };
  }

  revalidateTag(TAGS.customer);

  return { message: { success: "Deleted address successfully" } };
}

export async function ShopifyCreateCustomerAddress(
  prevState: any,
  formData: FormData,
  customer?: Customer,
): Promise<{ message: any }> {
  const customerToken = cookies().get("customerAccessToken")?.value;

  if (!customerToken) {
    return { message: { base: ["Unauthorized"] } };
  }

  if (!customer) {
    customer = await getCustomer(customerToken);
  }

  if (!customer) {
    return { message: { base: ["Unauthorized"] } };
  }

  const errors: any = {};
  const requiredFields = [
    "first_name",
    "last_name",
    "address1",
    "city",
    "country",
    "zip",
  ];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const address: any = {
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    city: formData.get("city"),
    company: formData.get("company"),
    country: formData.get("country"),
    firstName: formData.get("first_name"),
    lastName: formData.get("last_name"),
    phone: formData.get("phone"),
    zip: formData.get("zip"),
  };

  const res = await createCustomerAddress(address, customerToken);

  if (res.customerUserErrors && res.customerUserErrors.length > 0) {
    if (
      res.customerUserErrors[0].message === "Country is not a valid country"
    ) {
      return { message: { country: ["is not valid"] } };
    }

    return { message: { base: res.customerUserErrors[0].message } };
  }

  revalidateTag(TAGS.customer);

  return { message: { success: "Added address successfully" } };
}
