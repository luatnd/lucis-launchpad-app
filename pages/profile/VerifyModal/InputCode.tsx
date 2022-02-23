import { useRef, useState } from "react";
import s from "./modal.module.sass";

type Props = {
  length: number;
};
const InputCode = (props: Props) => {
  const { length } = props;
  const [code, setCode] = useState([...Array(length)].map(() => ""));

  const inputs = useRef([]);
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
            //   onChange={e => processInput(e, idx)}
            //   onKeyUp={e => onKeyUp(e, idx)}
            //   ref={ref => inputs.current.push(ref)}
          />
        );
      })}
    </div>
  );
};

export default InputCode;
