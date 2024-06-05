"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return null;
}
