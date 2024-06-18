import { getCustomer } from "@/lib/shopify";
import AccountTopBar from "../components/account/account-topbar";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Account() {
  if (!cookies().get("customerAccessToken")) {
    return notFound();
  }

  const customerAccessToken = cookies().get("customerAccessToken") ?? "";
  const customer = await getCustomer(
    customerAccessToken !== "" ? customerAccessToken.value : "",
  );

  if (!customer) {
    return notFound();
  }

  return (
    <main>
      <AccountTopBar firstName={customer.firstName} />
      <div className="h-[50dvh] border-b border-stroke-gray"></div>
    </main>
  );
}
