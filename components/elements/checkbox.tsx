"use client";

export default function Checkbox({
  value,
  label,
  id,
  disabled,
  className,
  state,
}: {
  value: string;
  label: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  state?: any;
}) {
  return (
    <div className={`checkbox ${className}`}>
      <input
        type="checkbox"
        id={id || value}
        name={value}
        className={`${state?.message?.[value] ? "!outline-stroke-red" : ""}`}
        disabled={disabled}
      />
      <label
        htmlFor={id || value}
        className={`${state?.message?.[value] ? "!text-text-red" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}
