import s from './TitleNameSection.module.sass'

type Props = {
    text: string;
};
export default function TitleSection (props:Props) {
    return(
        <h1 className={s.styleTitle}>{props.text}</h1>
    )
}