"use client";
import RenderImage from "../utilities/render-Image";
import { useState } from "react";

export default function Input({
  name,
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
  value,
}: {
  name: string;
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
  value?: string | number;
}) {
  const [show, setShow] = useState(false);
  const [inoutValue, setInputValue] = useState(value || "");

  return (
    <div className={`input${className ? ` ${className}` : ""}`}>
      {label && (
        <div className="flex justify-between">
          {label && <label htmlFor="password">{label}</label>}
          {state?.message?.[name] && (
            <p className="text-body-sm text-text-red">
              * {placeholder || label} {state.message[name]}
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
          id={id || name}
          name={name}
          {...(onChange ? { value: value } : { value: inoutValue })}
          placeholder={placeholder || label || ""}
          autoComplete={autoComplete || ""}
          aria-invalid={state?.message?.[name] ? "true" : "false"}
          onChange={onChange || ((e) => setInputValue(e.target.value))}
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
  );
}
