import type { Metadata } from "next";
import { Kaisei_Tokumin } from "next/font/google";
import "@/app/globals.css";
import localFont from "next/font/local";

import type { Viewport } from "next";

import SmoothScroller from "@/components/utilities/smooth-scoller";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Account from "@/components/account/account";
import { cookies } from "next/headers";
import Provider from "@/components/context/Provider";
import Cart from "@/components/cart/cart";
import { getMenu } from "@/lib/shopify";

export const viewport: Viewport = {
  themeColor: "#FBF9EE",
};

const generalSans = localFont({
  src: "../fonts/GeneralSans-Variable.ttf",
  variable: "--font-general-sans",
});
const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-kaisei-tokumin",
});

export const metadata: Metadata = {
  title: "Hytura store",
  description: "Store of Hytura",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = cookies().get("customerAccessToken") ? false : true;

  const footerMenu = await getMenu("footer");

  return (
    <html lang="en">
      <body
        className={`${generalSans.variable} ${kaiseiTokumin.variable} bg-background-sand`}
      >
        <Provider>
          <SmoothScroller />
          <Header isLoggedIn={isLoggedIn} />
          {children}
          <Footer menu={footerMenu} />
          <Cart />
          <Account />
        </Provider>
      </body>
    </html>
  );
}
