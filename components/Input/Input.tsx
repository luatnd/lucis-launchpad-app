import { ChangeEvent } from "react";
import s from "./Input.module.sass";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  valid?: boolean;
  name: string;
};

const Input = ({
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  valid = true,
  name,
}: Props) => {
  return (
    <div className={`${s.inputC} ${valid ? "" : s.invalid}`}>
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
