import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import { useEffect, useState } from "react";
import { slugify } from "../../utils/String";
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
};

export default function CardItem(props: Props) {
  const { soldOutResult, time, statusTime, title, description, id, srcFb } = props;

  // console.log(srcFb);

  const typeTime =
    statusTime == "UpComing"
      ? s.time
      : soldOutResult
      ? s.sold
      : statusTime == "SALE"
      ? s.sale
      : s.time;

  const bg_card = props.styleBg ? s.bg_1 : s.bg_2;

  const handleDesc =
    description && description.length > 120 ? description?.substring(0, 120) + "..." : description;

  const getCampaignDetailUrl = () => {
    return `/campaign/${id}/${slugify(props.title)}`;
  };

  const newDate = new Date();

  const [totalTime, setTotalTime] = useState(0);
  const [timer, setTimer] = useState<{ [name: string]: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const newTimeStartCampaign = new Date(time);
    const days = (newTimeStartCampaign.getDate() - newDate.getDate() - 1) * 86400;
    const hours = (24 - newDate.getHours() + newTimeStartCampaign.getHours()) * 3600;
    const minutes = (60 - newTimeStartCampaign.getMinutes() - newDate.getMinutes()) * 60;
    const seconds = 60 - newTimeStartCampaign.getSeconds() - newDate.getSeconds();
    const totalSeconds = days + hours + minutes + seconds;

    setTotalTime(totalSeconds);
  }, []);

  useEffect(() => {
    setTimer((item) => ({
      ...item,
      days: Math.floor(totalTime / (60 * 60 * 24)),
      hours: Math.floor((totalTime / (60 * 60)) % 24),
      minutes: Math.floor((totalTime / 60) % 60),
      seconds: Math.floor(totalTime % 60),
    }));
  }, [totalTime]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      if (totalTime < 0) {
        clearInterval(interval);
      } else {
        countTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTime]);

  const countTime = () => {
    if (
      totalTime > 0 &&
      (timer.days !== 0 || timer.hours !== 0 || timer.minutes !== 0 || timer.seconds !== 0)
    ) {
      setTimer((item) => ({ ...item, seconds: item.seconds - 1 }));
      if (timer.minutes >= 0 && timer.seconds - 1 < 0) {
        setTimer((item) => ({ ...item, seconds: 59 }));
        setTimer((item) => ({ ...item, minutes: item.minutes - 1 }));
        if (timer.hours >= 0 && timer.minutes - 1 < 0) {
          setTimer((item) => ({ ...item, minutes: 59 }));
          setTimer((item) => ({ ...item, hours: item.hours - 1 }));
          if (timer.days >= 0 && timer.hours - 1 < 0) {
            setTimer((item) => ({ ...item, hours: 23 }));
            if (timer.days - 1 > 0) {
              setTimer((item) => ({ ...item, days: item.days - 1 }));
            }
          }
        }
      }
    }
    setTotalTime((totalTime: any) => totalTime - 1);
  };

  return (
    <div className={`${s.CardContainer} ${bg_card}`}>
      <div className={s.img_game}>
        <img src={props.srcGame ?? ""} alt="" />
      </div>

      <div className={s.content}>
        <div className={s.headingCard}>
          <div className={`${s.styleTime} ${typeTime}`}>
            {props.statusTime == "UpComing"
              ? `${timer.days}d ${timer.hours}h ${timer.minutes}m ${
                  timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`
                }s`
              : props.statusTime == "Opening"
              ? soldOutResult
                ? "SOLD OUT"
                : `${timer.days}d ${timer.hours}h ${timer.minutes}m ${
                    timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`
                  }s`
              : props.time}
          </div>
          <h5>{props.nameGame}</h5>
          <div className={s.text}>{handleDesc}</div>
        </div>

        <div className={s.btnDetail}>
          <Link href={getCampaignDetailUrl()} passHref={true}>
            <GradientLinkButton type={1} className={s.styleBtn}>
              DETAIL
            </GradientLinkButton>
          </Link>
        </div>

        <div className={s.groupIcon}>
          <a href="https://lucis.network" target="_blank" rel="noopener noreferrer">
            <img src="/assets/UpComing/win.svg" alt="" />
          </a>
          <a href="https://www.facebook.com/lucistv.news" target="_blank" rel="noopener noreferrer">
            <img src="/assets/UpComing/fb.png" alt="" />
          </a>
          <a
            href="https://discord.com/channels/911921072830574603/926398655093702666"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/UpComing/dis.svg" alt="" />
          </a>
          <a href="https://t.me/sankeonft" target="_blank" rel="noopener noreferrer">
            <img src="/assets/UpComing/tele.svg" alt="" />
          </a>
          <a href="https://www.tiktok.com/@lucistvv" target="_blank" rel="noopener noreferrer">
            <img src="/assets/UpComing/tw.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
