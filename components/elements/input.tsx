"use client";
import RenderImage from "../utilities/render-Image";
import { useState } from "react";

export default function Input({
  value,
  label,
  id,
  placeholder,
  disabled,
  className,
  state,
  autoComplete,
  type,
  toggleShow,
  onChange,
  inputValue,
}: {
  value: string;
  label?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  state?: any;
  autoComplete?: string;
  type?: string;
  toggleShow?: boolean;
  onChange?: (e: any) => void;
  inputValue?: string | number;
}) {
  const [show, setShow] = useState(false);

  return (
    value && (
      <div className={`input ${className}`}>
        {label && (
          <div className="flex justify-between">
            {label && <label htmlFor="password">{label}</label>}
            {state && state.message[value] && (
              <p className="text-body-sm text-text-red">
                * {placeholder || label} {state.message[value]}
              </p>
            )}
          </div>
        )}
        <div
          className={`relative ${disabled ? "pointer-events-none opacity-50" : ""}`}
        >
          <input
            {...(show ? { type: "text" } : { type: type || "text" })}
            disabled={disabled || false}
            id={id || value}
            name={value}
            value={inputValue || ""}
            placeholder={placeholder || label || ""}
            autoComplete={autoComplete || ""}
            aria-invalid={state && state.message[value] ? "true" : "false"}
            onChange={onChange}
          />
          {toggleShow && (
            <button
              onClick={() => setShow(!show)}
              className={`absolute bottom-0 right-2x top-0 my-auto ${disabled && "opacity-50"}`}
              type="button"
            >
              {show ? (
                <RenderImage
                  src={"/icons/hide.svg"}
                  alt={"hide input"}
                  width={16}
                  height={16}
                />
              ) : (
                <RenderImage
                  src={"/icons/show.svg"}
                  alt={"show input"}
                  width={16}
                  height={16}
                />
              )}
            </button>
          )}
        </div>
      </div>
    )
  );
}
