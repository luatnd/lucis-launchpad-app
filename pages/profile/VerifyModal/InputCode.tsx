import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import s from "./modal.module.sass";

type Props = {
  length: number;
};

type InputProps = {
  e: ChangeEvent<HTMLInputElement>;
  idx: number;
};

type KeyProps = { e: KeyboardEvent<HTMLInputElement>; idx: number };

const InputCode = (props: Props) => {
  const { length } = props;
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef<HTMLInputElement[]>([]);

  const processInput = ({ e, idx }: InputProps) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[idx] = num;
    setCode(newCode);

    if (idx !== length - 1) {
      inputs.current[idx + 1].focus();
    }
    // if (newCode.every(num => num !== "")) {
    //   onComplete(newCode.join(""));
    // }
  };

  const onKeyUp = ({ e, idx }: KeyProps) => {
    if (e.keyCode === 8 && !code[idx] && idx !== 0) {
      const newCode = [...code];
      newCode[idx - 1] = "";
      setCode(newCode);
      inputs.current[idx - 1].focus();
    }
  };

  return (
    <div className={s.codeInputs}>
      {code.map((num, idx) => {
        return (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            //   readOnly={loading}
            onChange={(e) => processInput({ e, idx })}
            onKeyUp={(e) => onKeyUp({ e, idx })}
            ref={(ref: HTMLInputElement) => inputs.current.push(ref)}
          />
        );
      })}
    </div>
  );
};

export default InputCode;
