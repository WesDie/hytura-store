import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AccountReset from "@/components/account/account-reset";

export default async function MainAccountReset({
  params,
}: {
  params: { id: string };
}) {
  if (cookies().get("customerAccessToken")) {
    return notFound();
  }

  return (
    <main className="flex h-[80dvh] w-full border-b border-solid border-stroke-gray">
      <AccountReset id={params.id} />
    </main>
  );
}
