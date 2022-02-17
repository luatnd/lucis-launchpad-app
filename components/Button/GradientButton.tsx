import { DetailedHTMLProps } from "react";
type Props = DetailedHTMLProps<any, any> & {
    type: number,
}
  export default function SciButton(props: Props) {
    const btnType = props.type == 1
      ? 'bg-gradient-1 p-15px rounded-8px font-saira'
      : '';
    const {
    className,
    ...restProps
    } = props;

    return (
      <button className={`${btnType} ${className}`} {...restProps}/>
    )
  }