import { ChangeEvent } from "react";
import s from "./Input.module.sass";
import PhoneInputReact from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Input as InputAnt } from "antd";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  name: string;
  maxLength?: number;
};

const Input = ({
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  name,
  maxLength,
}: Props) => {
  return (
    <div className={`${s.inputC}`}>
      <InputAnt
        name={name}
        value={value !== "" ? value : ""}
        className={`${className} ${s.input}`}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;

export const PhoneInput = ({ value, onChange, onBlur, countryCode }: any) => {
  return (
    <div className={`${s.inputC}`}>
      <PhoneInputReact
        // country={countryCode.toLowerCase()}
        // onlyCountries={[countryCode.toLowerCase()]}
        specialLabel=""
        enableSearch
        searchPlaceholder="Search"
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
