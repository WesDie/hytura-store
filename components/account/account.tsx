import { cookies } from "next/headers";
import AccountDrawer from "./account-drawer";

export default async function Account() {
  if ((await cookies()).get("customerAccessToken")) {
    return <AccountDrawer isLoggedIn={true} />;
  }

  return <AccountDrawer />;
}
