export const to_hex_str = (str: string): string => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
};

export function trim_middle(s: string, head_len: number, tail_len: number) {
  return s.substring(0, head_len) + "..." + s.substring(s.length - tail_len);
}
