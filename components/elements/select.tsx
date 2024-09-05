"use client";
import RenderImage from "../utilities/render-Image";
import { useState, useRef, useEffect, useCallback } from "react";

export default function Select({
  name,
  value,
  label,
  options,
  id,
  disabled,
  className,
  state,
  onChange,
}: {
  name: string;
  value: string;
  label?: string;
  options: any[];
  id?: string;
  disabled?: boolean;
  className?: string;
  state?: any;
  onChange?: (e: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchValue, setSearchValue] = useState(
    options.find((option) => option.value === value)?.label || "",
  );

  const resetSearchValue = useCallback(() => {
    return (
      options.find(
        (option) => option.value === (selectRef.current?.value || ""),
      )?.label || ""
    );
  }, [options, selectRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchValue(resetSearchValue());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resetSearchValue]);

  const changeValue = (value: any) => {
    if (!selectRef.current) return;
    setSearchValue(
      options.find((option) => option.value === value)?.label || "",
    );

    selectRef.current.value = value;
    selectRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };

  useEffect(() => {
    if (searchValue) {
      setFilteredOptions(
        options.filter((option: any) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchValue, options]);

  return (
    name && (
      <div className={`select ${className ? className : ""}`}>
        {label && (
          <div className="flex justify-between">
            {label && <label htmlFor="password">{label}</label>}
            {state && state.message[name] && (
              <p className="text-body-sm text-text-red">
                * {label} {state.message[name]}
              </p>
            )}
          </div>
        )}
        <div
          ref={wrapperRef}
          className={`relative ${disabled ? "pointer-events-none opacity-50" : ""}`}
        >
          <div
            className={`select-inner ${searchValue == "" && !isOpen ? "!border-stroke-light-gray" : ""}`}
            aria-invalid={state && state.message[name] ? "true" : "false"}
          >
            <input
              type="text"
              className="w-full appearance-none bg-transparent py-1x focus:outline-none"
              placeholder="Search"
              ref={inputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={() => {
                setIsOpen(true);
                setSearchValue(!isOpen ? "" : searchValue);
              }}
            />
            <RenderImage
              src={"/icons/arrow-down.svg"}
              alt={"arrow down"}
              width={24}
              height={24}
              onClick={() => {
                setSearchValue(isOpen ? resetSearchValue() : "");
                inputRef.current?.focus();
                setIsOpen(!isOpen);
              }}
              className={`my-auto ml-auto h-fit transform cursor-pointer select-none py-1x transition-transform duration-300 ${
                isOpen ? "" : "-rotate-180"
              }`}
            />
          </div>
          <select
            disabled={disabled || false}
            id={id || name}
            name={name}
            hidden={true}
            onChange={onChange}
            ref={selectRef}
            value={value || ""}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            data-lenis-prevent
            className={`absolute left-0 top-[calc(100%-1px)] z-10 max-h-[200px] w-full select-none flex-col overflow-y-auto border border-solid border-stroke-black border-t-transparent ${
              isOpen ? `flex` : "hidden"
            }`}
          >
            {filteredOptions.length === 0 && (
              <div className="text-body-sm bg-background-sand px-2x py-1x text-text-light-gray">
                No results found
              </div>
            )}
            {filteredOptions.map((option: any) => (
              <div
                key={option.value}
                className="text-body-sm cursor-pointer bg-background-sand px-2x py-1x hover:bg-background-dark-sand"
                onClick={() => {
                  changeValue(option.value);
                  setSearchValue(resetSearchValue());
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
