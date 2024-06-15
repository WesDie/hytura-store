import type { Metadata } from "next";
import { Kaisei_Tokumin } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import type { Viewport } from "next";

import SmoothScroller from "./components/smooth-scoller";
import Header from "./sections/header";
import Footer from "./sections/footer";
import Account from "./components/account/account";
import { cookies } from "next/headers";
import Provider from "./context/Provider";
import Cart from "./components/cart/cart";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${generalSans.variable} ${kaiseiTokumin.variable} bg-background-sand`}
      >
        <Provider>
          <SmoothScroller />
          <Header
            isLoggedIn={cookies().get("customerAccessToken") ? false : true}
          />
          {children}
          <Footer />
          <Cart />
          <Account />
        </Provider>
      </body>
    </html>
  );
}
