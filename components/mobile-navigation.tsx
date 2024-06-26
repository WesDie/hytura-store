"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccountDrawer } from "./context/account-drawer-context";
import { useMobileNavigation } from "./context/mobile-navigation-context";
import RenderImage from "./render-Image";

export default function MobileNavigation({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const { setIsMobileNavigationOpen } = useMobileNavigation();
  const { setIsAccountOpen } = useAccountDrawer();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mobileNavigation = document.getElementById("mobile-navigation");

      if (mobileNavigation) {
        mobileNavigation.setAttribute(
          "style",
          `top: ${window.scrollY < 32 ? `${86 - window.scrollY}px` : "54px"}`,
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="mobile-navigation"
      className={`fixed bottom-0 left-0 right-0 z-50 flex translate-x-0 flex-col bg-background-sand transition-all duration-300 group-aria-hidden:translate-x-full md:hidden`}
    >
      <Link
        href={"/"}
        onClick={() => setIsMobileNavigationOpen(false)}
        className="text-heading-2xs w-full border-b border-stroke-gray p-2x"
      >
        Home
      </Link>
      <Link
        href={"/about"}
        onClick={() => setIsMobileNavigationOpen(false)}
        className="text-heading-2xs w-full border-b border-stroke-gray p-2x"
      >
        About
      </Link>
      <div className="flex flex-col border-b border-stroke-gray">
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className="text-heading-2xs flex justify-between p-2x"
        >
          Shop
          <RenderImage
            src={"/icons/arrow-down.svg"}
            alt={"arrow down"}
            width={24}
            height={24}
            className={`transform transition-transform duration-300 ${
              isSubMenuOpen ? "-rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`flex w-full gap-7x px-2x transition-opacity duration-300 ${isSubMenuOpen ? "pb-2x" : "pointer-events-none h-0 overflow-hidden pb-0 opacity-0"}`}
        >
          <div className="flex flex-col gap-1x">
            <h5 className="text-heading-3xs">Main products</h5>
            <div className="flex flex-col gap-[4px]">
              <Link
                href="/collection/all"
                onClick={() => setIsMobileNavigationOpen(false)}
                className="text-body-xs"
              >
                All
              </Link>
              <Link
                href="/collection/home%20page"
                onClick={() => setIsMobileNavigationOpen(false)}
                className="text-body-xs"
              >
                Home page
              </Link>
              <Link
                href="/collecion/sprays"
                onClick={() => setIsMobileNavigationOpen(false)}
                className="text-body-xs"
              >
                Sprays
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-1x">
            <h5 className="text-heading-3xs">Other</h5>
            <div className="flex flex-col gap-[4px]">
              <Link
                href="/"
                onClick={() => setIsMobileNavigationOpen(false)}
                className="text-body-xs"
              >
                Accesories
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={"/journal/news"}
        onClick={() => setIsMobileNavigationOpen(false)}
        className="text-heading-2xs w-full border-b border-stroke-gray p-2x"
      >
        Journal
      </Link>
      <div className="mt-auto flex w-full flex-col gap-2x px-2x pb-3x">
        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsAccountOpen(true);
              setIsMobileNavigationOpen(false);
            }}
            className="button-secondary"
          >
            Login
          </button>
        ) : (
          <Link
            href={"/account"}
            onClick={() => setIsMobileNavigationOpen(false)}
            className="button-secondary text-center"
          >
            Account
          </Link>
        )}
        <p className="text-body-sm">Language: EN</p>
      </div>
    </div>
  );
}
