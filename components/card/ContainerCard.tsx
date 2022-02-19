import s from './ContainerCard.module.sass';
import GradientButton from '../Button/GradientButton';


type Props = {
    srcGame: string;
    time: string;
    nameGame: string;
    title: string;
    statusTime: string;
    styleBg: boolean;
};

export default function CardItem(props: Props) {
    const typeTime = props.statusTime == 'UpComing'? s.time
    :props.statusTime == 'SoldOut'? s.Sold
    :s.sale
    const bg_card = props.styleBg? s.bg_1
    :s.bg_2

    return (
        <div className={`${s.CardContainer} ${bg_card}`}>
            <div className={s.img_game}>
                <img src={props.srcGame} alt="" />
            </div>
            <div className={s.content}>
                <div className={s.headingCard}>
                    <div className={`${s.styleTime} ${typeTime}`}>{props.time}</div>
                    <h5>{props.nameGame}</h5>
                    <p>{props.title}</p>
                </div>
                <div className={s.btnDetail}><GradientButton type={1} className={s.styleBtn}>DETAIL</GradientButton></div>
                <div className={s.groupIcon}>
                    <a href="#"><img src="/assets/UpComing/win.svg" alt="" /></a>
                    <a href="#"><img src="/assets/UpComing/fb.png" alt="" /></a>
                    <a href="#"><img src="/assets/UpComing/dis.svg" alt="" /></a>
                    <a href="#"><img src="/assets/UpComing/tele.svg" alt="" /></a>
                    <a href="#"><img src="/assets/UpComing/tw.svg" alt="" /></a>
                </div>
            </div>
        </div>
    )
}