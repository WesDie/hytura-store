import React, { useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "./select";

export default function CountrySelector({
  value,
  onChange,
  state,
}: {
  value: string;
  onChange: (e: any) => void;
  state?: any;
}) {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <Select
      options={options}
      value={value}
      name="country"
      label="Country"
      onChange={onChange}
      state={state}
    />
  );
}
