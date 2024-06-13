"use server";

import { cookies } from "next/headers";
import { createCustomerToken } from "..";

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
    console.log("body", body);

    if (body.errors) {
      return { message: body.errors };
    }

    return { message: "Customer created successfully" };
  } catch (error) {
    console.error("Error:", error);

    throw {
      error: error,
    };
  }
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
      return { message: "Logged in successfully" };
    } else if (res.customerUserErrors) {
      if (res.customerUserErrors[0].message === "Unidentified customer") {
        return { message: { base: ["Invalid email or password"] } };
      }

      return { message: res.customerUserErrors[0].message };
    }
  }

  return { message: "Somthing went wrong" };
}
