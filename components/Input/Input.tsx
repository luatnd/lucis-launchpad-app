import { ChangeEvent } from "react";
import s from "./Input.module.sass";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
  placeholder?: string;
  valid?: boolean;
};

const Input = ({ value, onChange, onBlur, className, placeholder, valid = true }: Props) => {
  return (
    <div className={`${s.inputC} ${valid ? "" : s.invalid}`}>
      <input
        value={value}
        className={`${className} ${s.input}`}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
