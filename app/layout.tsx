import type { Metadata } from "next";
import { Kaisei_Tokumin } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "./sections/header";

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
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FBF9EE",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
