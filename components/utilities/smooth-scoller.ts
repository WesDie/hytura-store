"use client";

import Lenis from "lenis";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCartDrawer } from "../context/cart-drawer-context";
import { useAccountDrawer } from "../context/account-drawer-context";
import { useMobileNavigation } from "../context/mobile-navigation-context";

export default function SmoothScroller() {
  const { isCartOpen } = useCartDrawer();
  const { isAccountOpen } = useAccountDrawer();
  const { isMobileNavigationOpen } = useMobileNavigation();

  const pathname = usePathname();
  const oldPathname = useRef(usePathname());

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.2,
    });

    lenis.on("scroll", (e: any) => {
      // console.log(e);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (isAccountOpen || isCartOpen || isMobileNavigationOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    if (pathname !== oldPathname.current) {
      window.scrollTo(0, 0);
      oldPathname.current = pathname;
    }

    return () => {
      lenis.stop();
      lenis.destroy();
    };
  }, [isAccountOpen, isCartOpen, isMobileNavigationOpen, pathname]);

  return null;
}
