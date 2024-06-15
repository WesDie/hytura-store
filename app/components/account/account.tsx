import { cookies } from "next/headers";
import AccountDrawer from "./account-drawer";

export default async function Account() {
  if (cookies().get("customerAccessToken")) {
    return null;
  }

  return <AccountDrawer />;
}
