import { useCallback } from "react";
import Link from "next/link";

import { slugify } from "../../utils/String";
import s from './ContainerCard.module.sass';
import { GradientLinkButton } from '../Button/GradientButton';


type Props = {
    srcGame: string;
    time: string;
    nameGame: string;
    title: string;
    statusTime: string;
    styleBg: boolean;
    inTime: string;
    srcWeb: string;
    srcFb: string;
    srcTele: string;
    srcDiscord: string;
    srcTwitter: string;
};

export default function CardItem(props: Props) {
    const typeTime = props.statusTime == 'UpComing'? s.time
    :props.statusTime == 'SoldOut'? s.Sold
    :s.sale
    const bg_card = props.styleBg? s.bg_1
    :s.bg_2

    const handleText = props.title.length > 140 ? props.title.substring(0, 140) + '...': props.title
    const SoldOutBox = !props.styleBg? <p>Sold out <span>{props.inTime}</span></p>: ''

    const getCampaignDetailUrl = () => {
        const id = "12345678";
        return `/campaign/${id}/${slugify(props.title)}`;
    }


    return (
        <div className={`${s.CardContainer} ${bg_card}`}>
            <div className={s.img_game}>
                <img src={props.srcGame} alt="" />
            </div>
            <div className={s.content}>
                <div className={s.headingCard}>
                    <div className={`${s.styleTime} ${typeTime}`}>
                        {props.time}
                        {SoldOutBox}
                    </div>
                    <h5>{props.nameGame}</h5>
                    <div className={s.text}>{handleText}</div>
                </div>
                <div className={s.btnDetail}>
                    <Link href={getCampaignDetailUrl()} passHref={true}>
                        <GradientLinkButton type={1} className={s.styleBtn}>
                            DETAIL
                        </GradientLinkButton>
                    </Link>
                </div>
                <div className={s.groupIcon}>
                    <a href={props.srcWeb}><img src="/assets/UpComing/win.svg" alt="" /></a>
                    <a href={props.srcFb}><img src="/assets/UpComing/fb.png" alt="" /></a>
                    <a href={props.srcDiscord}><img src="/assets/UpComing/dis.svg" alt="" /></a>
                    <a href={props.srcTele}><img src="/assets/UpComing/tele.svg" alt="" /></a>
                    <a href={props.srcTwitter}><img src="/assets/UpComing/tw.svg" alt="" /></a>
                </div>
            </div>
        </div>
    )
}