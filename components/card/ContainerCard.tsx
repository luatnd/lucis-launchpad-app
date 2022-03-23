import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GChain } from "src/generated/graphql";
import { useCountDown } from "utils/Time";
import { slugify, truncateStr } from "../../utils/String";
import { GradientLinkButton } from "../Button/GradientButton";
import s from "./ContainerCard.module.sass";

type Props = {
  srcGame: Maybe<string> | undefined;
  time: any;
  nameGame: Maybe<string> | undefined;
  title: Maybe<string> | undefined;
  statusTime: string;
  styleBg: boolean;
  srcWeb: Maybe<string> | undefined;
  srcFb: Maybe<string> | undefined;
  srcTele: Maybe<string> | undefined;
  srcDiscord: Maybe<string> | undefined;
  srcTwitter: Maybe<string> | undefined;
  soldOutResult?: boolean;
  description: Maybe<string> | undefined;
  id: string;
  highlight: Maybe<string> | undefined;
  chains: GChain[];
};

export default function CardItem(props: Props) {
  const {
    soldOutResult,
    time,
    statusTime,
    title,
    description,
    id,
    srcFb,
    srcWeb,
    srcTele,
    srcTwitter,
    srcDiscord,
    highlight,
    chains,
  } = props;

  const typeTime =
    statusTime == "UPCOMING"
      ? s.time
      : soldOutResult
      ? s.sold
      : statusTime == "CLOSED"
      ? s.sale
      : s.time;

  const bg_card = props.styleBg ? s.bg_1 : s.bg_2;

  const handleDesc =
    description && description.length > 120
      ? description?.substring(0, 120) + "..."
      : description;

  const getCampaignDetailUrl = () => {
    return `/campaign/${id}/${slugify(props.title)}`;
  };

  const timer = useCountDown(time);

  return (
    <div className={`${s.CardContainer} ${bg_card} mt-120px sm:mt-150px`}>
      <div className={s.img_game}>
        <img src={props.srcGame ?? ""} alt="" />
      </div>

      <div className={s.content}>
        <div className={s.headingCard}>
          <div className={`${s.styleTime} ${typeTime}`}>
            {statusTime == "UPCOMING"
              ? `${timer.days}d ${timer.hours}h ${timer.minutes}m ${
                  timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`
                }s`
              : statusTime == "OPENING"
              ? soldOutResult
                ? "SOLD OUT"
                : `${timer.days}d ${timer.hours}h ${timer.minutes}m ${
                    timer.seconds < 10
                      ? `0${timer.seconds}`
                      : `${timer.seconds}`
                  }s`
              : "SALE ENDED"}
            {statusTime !== "CLOSED" && (
              <span className="text-[12px] xl:text-[14px] pl-2">
                {highlight ?? ""}
              </span>
            )}

            {/* Highlight for closed campaign */}
            {statusTime == "CLOSED" && highlight && (
              <p>
                SOLD OUT <span>{highlight}</span>
              </p>
            )}
          </div>
          <h5>{props.nameGame}</h5>
          <div className={s.text}>{truncateStr(handleDesc, 0, 20)}</div>
        </div>

        <div className={s.btnDetail}>
          <Link href={getCampaignDetailUrl()} passHref={true}>
            <GradientLinkButton type={1} className={s.styleBtn}>
              DETAIL
            </GradientLinkButton>
          </Link>
        </div>

        <div className={s.groupIcon}>
          <img
            src={chains[0]?.icon ?? "/assets/crypto/ico-chain-bsc.png"}
            alt=""
          />
          <div className={s.block_iconLeft}>
            {srcWeb && (
              <a href={srcWeb} target="_blank" rel="noopener noreferrer">
                <img src="/assets/UpComing/win.svg" alt="" />
              </a>
            )}

            {srcFb && (
              <a href={srcFb} target="_blank" rel="noopener noreferrer">
                <img src="/assets/UpComing/fb.png" alt="" />
              </a>
            )}

            {srcDiscord && (
              <a href={srcDiscord} target="_blank" rel="noopener noreferrer">
                <img src="/assets/UpComing/dis.svg" alt="" />
              </a>
            )}

            {srcTele && (
              <a href={srcTele} target="_blank" rel="noopener noreferrer">
                <img src="/assets/UpComing/tele.svg" alt="" />
              </a>
            )}

            {/* <a
              href="https://www.tiktok.com/@lucistvv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/UpComing/tw.svg" alt="" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
