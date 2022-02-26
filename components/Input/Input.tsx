import { ChangeEvent } from "react";
import s from "./Input.module.sass";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
};

const Input = ({ value, onChange, onBlur, className }: Props) => {
  return (
    <div className={s.inputC}>
      <input
        value={value}
        className={`${className} ${s.input}`}
        placeholder="your.email@example.com"
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
