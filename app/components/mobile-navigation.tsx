"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccountDrawer } from "../context/account-drawer-context";
import { useMobileNavigation } from "../context/mobile-navigation-context";

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
      console.log(window.scrollY);

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
      className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-background-sand md:hidden`}
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-300 ${
              isSubMenuOpen ? "-rotate-180" : ""
            }`}
          >
            <g clip-path="url(#clip0_147_1728)">
              <path
                d="M3 17L12 7L21 17"
                stroke="#1F1F1F"
                stroke-width="0.892857"
                stroke-linecap="square"
              />
            </g>
            <defs>
              <clipPath id="clip0_147_1728">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="matrix(-1 0 0 -1 24 24)"
                />
              </clipPath>
            </defs>
          </svg>
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
