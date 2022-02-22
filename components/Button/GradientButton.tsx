import { DetailedHTMLProps } from "react";
import s from './GradientButton.module.sass'

type Props = DetailedHTMLProps<any, any> & {
    type: number,
    small?: boolean,
}
  export default function GradientButton(props: Props) {
    const btnType = (props.type == 1
      ? 'bg-gradient-1 p-15px rounded-8px font-saira'
      : '') + (props.small ? ` ${s.small}` : '');

    const {
    className,
    ...restProps
    } = props;

    return (
      <button className={`${btnType} ${className}`} {...restProps}/>
    )
  }
