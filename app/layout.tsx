import type { Metadata } from "next";
import { Kaisei_Tokumin } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "./sections/header";
import SmoothScroller from "./components/smooth-scoller";
import type { Viewport } from "next";

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
        <SmoothScroller />
        <Header />
        {children}
      </body>
    </html>
  );
}
