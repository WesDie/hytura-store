"use server";

import { cookies } from "next/headers";
import {
  createCustomerToken,
  customerSendPasswordResetEmail,
  customerActivateAccount,
  updateCartIdentity,
  updateCustomer,
  getCustomer,
} from "@/lib/shopify/index";
import { Customer } from "../types";

export async function createCustomer(
  formData: FormData,
  emailMarketing?: boolean,
) {
  const data = JSON.stringify({
    customer: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: "",
      verified_email: true,
      password: formData.get("password"),
      password_confirmation: formData.get("password"),
      send_email_welcome: false,
      email_marketing_consent: {
        state:
          formData.get("email_marketing_status") == "on"
            ? "subscribed"
            : "unsubscribed",
      },
    },
  });

  const endpoint = process.env.SHOPIFY_ADMIN_DOMAIN + "/customers.json";
  const key = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  try {
    if (!endpoint) {
      throw new Error("Endpoint is not defined");
    } else if (!key) {
      throw new Error("Key is not defined");
    }

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": key,
      },
      body: data,
    });

    const body = await result.json();

    if (body.errors) {
      if (emailMarketing) {
        return {
          message: { succes: "Updated marketing status" },
        };
      }

      return { message: body.errors };
    }

    if (emailMarketing) {
      return { message: { succes: "Subscribed to marketing succesfully" } };
    }

    return { message: { succes: "Created customer succesfully" } };
  } catch (error) {
    console.error("Error:", error);

    throw {
      error: error,
    };
  }
}

export async function shopifyCreateCustomer(
  prevState: any,
  formData: FormData,
) {
  if (formData.get("accpets_terms") !== "on") {
    return { message: { base: ["Please accept the terms and conditions"] } };
  }

  const errors: any = {};
  const requiredFields = ["first_name", "last_name", "email", "password"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
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

      return { message: { succes: "Logged in successfully" } };
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

    return { message: { succes: "Email sent successfully" } };
  }

  return { message: { error: "Somthing went wrong" } };
}

export async function shopifyLogoutCustomer() {
  cookies().delete("customerAccessToken");

  return { message: { succes: "Logout succes" } };
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

      return { message: { succes: "Activated customer succesfully" } };
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

    if (customer.email !== formData.get("email")) {
      return await createCustomer(formData, true);
    }

    const updateRes = await shopifyUpdateCustomer(null, formData);
    if (updateRes.message.succes.length > 0) {
      return {
        message: { succes: "Updated marketing status" },
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
  const requiredFields = ["first_name", "last_name", "email"];
  requiredFields.forEach((field) => {
    if (formData.get(field) === "") {
      errors[field] = [`is required`];
    }
  });

  if (Object.keys(errors).length > 0) {
    return { message: errors };
  }

  const newCustomerData: Customer = {
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
    return { message: res.customerUserErrors };
  }

  return { message: { succes: "Updated customer succesfully" } };
}
