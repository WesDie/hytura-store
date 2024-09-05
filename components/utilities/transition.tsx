"use client";
import React, { useEffect, useState } from "react";

export default function Transiton({
  children,
  transitonTime,
  state,
  className,
}: {
  children: React.ReactNode;
  transitonTime: number;
  state: boolean;
  className?: string;
}) {
  const [renderCart, setRenderCart] = useState(state);
  const [transition, setTransition] = useState(state);

  useEffect(() => {
    if (state) {
      setRenderCart(true);
      const timer = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(timer);
    } else {
      setTransition(false);
      const timer = setTimeout(() => setRenderCart(false), transitonTime);
      return () => clearTimeout(timer);
    }
  }, [state, transitonTime]);

  return renderCart ? (
    <div
      aria-hidden={!transition}
      className={`group ${className ? className : ""}`}
    >
      {children}
    </div>
  ) : null;
}
