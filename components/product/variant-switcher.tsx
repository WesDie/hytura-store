"use client";

import { ProductOption, ProductVariant } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSwitcher({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  return options.map((option) => (
    <div className="flex flex-col gap-1x" key={option.id}>
      <dt className="text-body-sm">{option.name}</dt>
      <div className="flex gap-1x">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          const optionSearchParams = new URLSearchParams(
            searchParams.toString(),
          );

          optionSearchParams.set(optionNameLowerCase, value);
          const optionUrl = createUrl(pathname, optionSearchParams);

          const filtered = Array.from(optionSearchParams.entries()).filter(
            ([key, value]) =>
              options.find(
                (option) =>
                  option.name.toLowerCase() === key &&
                  option.values.includes(value),
              ),
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) =>
                combination[key] === value && combination.availableForSale,
            ),
          );

          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              key={value}
              onClick={() => {
                router.replace(optionUrl, { scroll: false });
              }}
              title={`${option.name} ${value}${!isAvailableForSale ? " (Out of stock)" : ""}`}
              className={`line-trough-button ${isActive ? "button-primary" : "button-secondary"} ${isAvailableForSale ? "" : "relative opacity-50 after:scale-x-[1]"}`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  ));
}
