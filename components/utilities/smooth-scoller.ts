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

  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenis.current) lenis.current!.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
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

    return () => {
      lenis.destroy();
    };
  }, [isAccountOpen, isCartOpen, isMobileNavigationOpen]);

  return null;
}
