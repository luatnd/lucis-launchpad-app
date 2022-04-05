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
  // valid?: boolean;
  name: string;
};

const Input = ({
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  // valid = true,
  name,
}: Props) => {
  return (
    <div className={`${s.inputC}`}>
      <input
        name={name}
        value={value !== "" ? value : undefined}
        className={`${className} ${s.input}`}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

export const PhoneInput = () => {
  return (
    <div className={`${s.inputC}`}>
      <PhoneInputReact
        // country={this.state.countryCode}
        specialLabel=""
        enableSearch
        searchPlaceholder="Search"
        enableTerritories
        // value={this.state.phoneNumber}
        // onChange={this.handleChangePhoneNumber}
        // onEnterKeyPress={this.handleSendEnterPress}
        inputProps={{
          style: {
            background: "none",
            border: 0,
            boxShadow: "none",
            color: "white",
          },
        }}
        // containerStyle={{
        //   maxWidth: "calc(100% - 150px)",
        // }}
      />
    </div>
  );
};
