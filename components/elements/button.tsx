"use client";
import RenderImage from "../utilities/render-Image";
import { useFormStatus } from "react-dom";

export default function Button({
  text,
  variant,
  disabled,
  className,
  onclick,
  arrow,
  type,
}: {
  text: string;
  variant: "primary" | "secondary" | "link" | "header-link";
  disabled?: boolean;
  className?: string;
  onclick?: () => void;
  arrow?: boolean;
  type?: "submit";
}) {
  let variantClass = "button-primary";

  if (variant === "secondary") {
    variantClass = "button-secondary";
  } else if (variant === "link") {
    variantClass = "button-link";
  } else if (variant === "header-link") {
    variantClass = "button-header-link";
  }

  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled || pending}
      type={type}
      className={`${variantClass} ${className} ${arrow ? "flex gap-4x" : ""}`}
      onClick={onclick}
    >
      {text}
      {arrow && (
        <RenderImage
          src={"/icons/arrow-right.svg"}
          alt={"arrow right"}
          width={12}
          height={13}
          className="my-auto"
        />
      )}
    </button>
  );
}
