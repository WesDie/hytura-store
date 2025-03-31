import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AccountActivation from "@/components/account/account-activation";

export default async function MainAccountActivation(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  if ((await cookies()).get("customerAccessToken")) {
    return notFound();
  }

  return (
    <main className="flex h-[80dvh] w-full border-b border-solid border-stroke-gray">
      <AccountActivation id={params.id} />
    </main>
  );
}
