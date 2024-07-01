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
        if (body.errors.email && body.errors.email[0].includes("is invalid")) {
          return { message: { email: body.errors.email } };
        }

        return {
          message: { success: "Updated marketing status" },
        };
      }

      return { message: body.errors };
    }

    if (emailMarketing) {
      return { message: { success: "Subscribed to marketing successfully" } };
    }

    return { message: { success: "Created customer successfully" } };
  } catch (error) {
    console.error("Error:", error);

    throw {
      error: error,
    };
  }
}
