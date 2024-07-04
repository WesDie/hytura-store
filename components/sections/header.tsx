"use client";

import { useEffect, useState } from "react";
import RenderImage from "@/components/utilities/render-Image";
import Link from "next/link";
import {
  useCartDrawer,
  useCartCount,
} from "@/components/context/cart-drawer-context";
import { useAccountDrawer } from "@/components/context/account-drawer-context";
import { useMobileNavigation } from "@/components/context/mobile-navigation-context";
import MobileNavigation from "@/components/elements/mobile-navigation";
import Transiton from "@/components/utilities/transition";
import Button from "../elements/button";
import { Menu } from "@/lib/shopify/types";

export default function Header({
  isLoggedIn,
  menu,
  shopMenu,
}: {
  isLoggedIn: boolean;
  menu: Menu[];
  shopMenu: Menu[];
}) {
  const { setIsCartOpen } = useCartDrawer();
  const { setIsAccountOpen } = useAccountDrawer();
  const { cartCount } = useCartCount();
  const { setIsMobileNavigationOpen, isMobileNavigationOpen } =
    useMobileNavigation();

  const [isTop, setIsTop] = useState(false);
  const [isShopDropdownActive, setIsShopDropdownActive] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY < 32) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };
    checkScrollPosition();

    window.onscroll = () => {
      const announcementBar = document.querySelector(
        "#announcementBar",
      ) as HTMLElement;
      const header = document.querySelector("header") as HTMLElement;

      if (window.scrollY < 32) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }

      if (header) {
        header.setAttribute(
          "style",
          `top: ${window.scrollY < 32 ? `${32 - window.scrollY}px` : "-0"}`,
        );
      }

      if (announcementBar) {
        announcementBar.setAttribute(
          "style",
          `top: ${window.scrollY < 32 ? `${0 - window.scrollY}px` : "-32px"}`,
        );
      }
    };
  });

  return (
    <>
      <div className="h-[86px]" id="empty-header-height"></div>
      {isTop && (
        <div
          id="announcementBar"
          className={`fixed top-[0] z-[11] w-full bg-background-dark-gray py-1x`}
        >
          <p className="text-heading-4xs text-center text-text-white">
            All orders over €25 shipped for free
          </p>
        </div>
      )}
      <header
        className={`blur-transition blur-header fixed flex w-full justify-between border-b border-solid bg-background-sand ${
          isTop ? "top-[32px]" : "top-[0]"
        } z-10 transition-colors duration-300 ${isMobileNavigationOpen ? "border-stroke-gray" : "border-stroke-black"}`}
      >
        <div className="z-[11] flex w-full gap-5x py-2x pl-2x md:pl-3x">
          <Link href="/" className="flex">
            <RenderImage
              src={"/icons/logo.svg"}
              alt={"logo"}
              width={73}
              height={21}
              className="w-fit"
            />
          </Link>
          <div className="hidden gap-2x md:flex">
            {menu.map((item) =>
              item.title.toLowerCase() === "shop" ? (
                <Link
                  key={item.title}
                  href={item.path}
                  className="button-header-link"
                  onMouseOver={() => setIsShopDropdownActive(true)}
                  onMouseLeave={() => setIsShopDropdownActive(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  key={item.title}
                  href={item.path}
                  className="button-header-link"
                >
                  {item.title}
                </Link>
              ),
            )}
          </div>
        </div>
        <div className="z-[11] hidden w-full justify-end gap-2x py-2x pr-2x md:flex md:pr-3x">
          {/* <button className="button-header-link">EN</button> */}
          {isLoggedIn ? (
            <Button
              text="Login"
              variant="header-link"
              onclick={() => setIsAccountOpen(true)}
            />
          ) : (
            <Link
              href={"/account/general-information"}
              className="button-header-link"
            >
              Account
            </Link>
          )}
          <Button
            text={`Cart (${cartCount})`}
            variant="header-link"
            onclick={() => setIsCartOpen(true)}
          />
        </div>
        <div className="relative z-[11] my-auto mr-1x flex md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex h-4x w-4x"
          >
            <RenderImage
              src={"/icons/cart.svg"}
              alt={"cart icon"}
              width={17}
              height={20}
              className="m-auto"
            />
          </button>
          <button
            className={`flex h-4x w-4x transition-opacity ${isMobileNavigationOpen ? "pointer-events-none opacity-0" : ""}`}
            onClick={() => setIsMobileNavigationOpen(true)}
          >
            <RenderImage
              src={"/icons/hamburger-menu.svg"}
              alt={"menu icon"}
              width={20}
              height={16}
              className="m-auto"
            />
          </button>
          <button
            className={`absolute right-0 flex h-4x w-4x transition-opacity ${isMobileNavigationOpen ? "" : "pointer-events-none opacity-0"}`}
            onClick={() => setIsMobileNavigationOpen(false)}
          >
            <RenderImage
              src={"/icons/close.svg"}
              alt={"close icon"}
              width={24}
              height={24}
              className="m-auto"
            />
          </button>
        </div>
        <div
          id="shop-dropdown-header"
          className={`${
            isShopDropdownActive
              ? "visible max-h-[200px] min-h-[100px] border-b py-3x opacity-100"
              : "invisible max-h-[0px] py-0 opacity-0"
          } absolute left-0 right-0 top-[54px] flex w-full justify-between overflow-hidden border-solid border-stroke-black bg-background-sand px-3x backdrop-blur-lg transition-all delay-75 duration-300 ease-in-out`}
          onMouseOver={() => setIsShopDropdownActive(true)}
          onMouseLeave={() => setIsShopDropdownActive(false)}
        >
          <div
            className={`flex gap-2x transition-all duration-300 ${isShopDropdownActive ? "opacity-100" : "opacity-0"}`}
          >
            {shopMenu.map((item) => (
              <div
                key={item.title}
                className="flex min-w-[175px] flex-col gap-1x"
              >
                <h3 className="text-heading-xs">{item.title}</h3>
                <div className="flex flex-col gap-[4px]">
                  {item.items.map((link) => (
                    <Link
                      key={link.title}
                      href={link.path}
                      className={`button-header-link text-body-sm`}
                      onClick={() => setIsShopDropdownActive(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <RenderImage
            src={"/hero.png"}
            alt={"product image"}
            width={1000}
            height={667}
            className={`max-h-full w-full max-w-[350px]`}
            imageClassName="w-full h-full object-cover"
          />
        </div>
      </header>
      <Transiton transitonTime={300} state={isMobileNavigationOpen}>
        <MobileNavigation isLoggedIn={isLoggedIn} />
      </Transiton>
    </>
  );
}
