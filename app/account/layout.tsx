import { getCustomer } from "@/lib/shopify";
import AccountTopBar from "@/components/account/account-page/account-topbar";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CustomerProvider } from "@/components/context/customer-context";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <CustomerProvider customer={customer}>
      <main>
        <AccountTopBar firstName={customer.firstName} />
        <div className="flex min-h-[60dvh] flex-col border-b border-stroke-gray md:flex-row">
          {children}
        </div>
      </main>
    </CustomerProvider>
  );
}
