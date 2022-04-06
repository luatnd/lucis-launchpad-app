import { ChangeEvent } from "react";
import s from "./Input.module.sass";
import PhoneInputReact from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  name: string;
};

const Input = ({
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  name,
}: Props) => {
  return (
    <div className={`${s.inputC}`}>
      <input
        name={name}
        value={value !== "" ? value : ""}
        className={`${className} ${s.input}`}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

export const PhoneInput = ({ value, onChange, onBlur, countryCode }: any) => {
  return (
    <div className={`${s.inputC}`}>
      <PhoneInputReact
        country={countryCode.toLowerCase()}
        onlyCountries={[countryCode.toLowerCase()]}
        specialLabel=""
        // enableSearch
        // searchPlaceholder="Search"
        enableTerritories
        value={value !== "" ? value : ""}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{
          style: {
            background: "none",
            border: 0,
            boxShadow: "none",
            color: "white",
          },
        }}
      />
    </div>
  );
};
