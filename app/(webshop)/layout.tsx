import type { Metadata } from "next";
import "@/app/(webshop)/globals.css";
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
  src: "../../fonts/GeneralSans-Variable.ttf",
  variable: "--font-general-sans",
});
const kaiseiTokumin = localFont({
  src: "../../fonts/KaiseiTokumin-Regular.ttf",
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
  const isLoggedIn = (await cookies()).get("customerAccessToken")
    ? false
    : true;

  const footerMenu = await getMenu("footer");
  const headerMenu = await getMenu("header");
  const shopMenu = await getMenu("shopmenu");

  return (
    <html lang="en">
      <body
        className={`${generalSans.variable} ${kaiseiTokumin.variable} bg-background-sand`}
      >
        <Provider>
          <SmoothScroller />
          <Header
            isLoggedIn={isLoggedIn}
            menu={headerMenu}
            shopMenu={shopMenu}
          />
          {children}
          <Footer menu={footerMenu} />
          <Cart />
          <Account />
        </Provider>
      </body>
    </html>
  );
}
