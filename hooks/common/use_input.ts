import { useState } from "react";

export function useInput(defaultValue: string) {
  const [value, setValue] = useState<string>(defaultValue);
  const [err, setErr] = useState<string | undefined>();

  const onChange = function (_value: string | null) {
    setErr(undefined);
    setValue(_value ?? "");
  };

  return { value, onChange, setValue, err, setErr };
}
