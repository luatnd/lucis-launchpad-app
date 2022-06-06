import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import { useCountDown } from "utils/Time";
import s from "./SilderBanner.module.sass";
type Props = {
  status: string;
  logo: Maybe<string> | undefined;
  desc: Maybe<string> | undefined;
  banner: Maybe<string> | undefined;
  href: string;
  loading: boolean;
  name: Maybe<string> | undefined;
  facebook: Maybe<string> | undefined;
  discord: Maybe<string> | undefined;
  twitter: Maybe<string> | undefined;
  tele: Maybe<string> | undefined;
  website: Maybe<string> | undefined;
  timeCountDown: number;
};

export default function ItemSliderBanner(props: Props) {
  const {
    status,
    logo,
    desc,
    href,
    banner,
    name,
    facebook,
    website,
    twitter,
    tele,
    discord,
    timeCountDown,
  } = props;
  const timer = useCountDown(timeCountDown);

  const checkTimeLeft =
    timer.days <= 0 &&
    timer.hours <= 0 &&
    timer.minutes <= 0 &&
    timer.seconds <= 0
      ? false
      : true;

  const statusStyle =
    status === "OPENING"
      ? s.opening
      : status === "CLOSED"
      ? s.closed
      : s.upcoming;

  return (
    <div className={`${s.contentItemSilder} lucis-container`}>
      <div className={s.contentDetail}>
        <div className={s.headingItem}>
          <div className={s.contentItemTop}>
            <div className={statusStyle}>{status}</div>
            {checkTimeLeft && (
              <div className={s.Time}>
                {timer.days}d {timer.hours}h{" "}
                {timer.minutes < 10 ? `0${timer.minutes}` : `${timer.minutes}`}m{" "}
                {timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`}s
              </div>
            )}
          </div>
          {/* status game */}
          <div className={s.logoGame}>
            <img src={logo ?? ""} alt="" />
          </div>
          {/* logo game */}
          <p className={`${s.nameCampaign} py-2`}>{name?.toUpperCase()}</p>
          <p className={`${s.desc} pb-5`}>{desc}</p>
          {/* text */}
          <div className={s.contentItemBottom}>
            <div className={s.groupLink}>
              {facebook && (
                <a href={facebook}>
                  <img src="/assets/Banner/svg/fb.svg" alt="" />
                </a>
              )}

              {discord && (
                <a href={discord}>
                  <img src="/assets/Banner/svg/dis.svg" alt="" />
                </a>
              )}

              {tele && (
                <a href={tele}>
                  <img src="/assets/Banner/svg/tele.svg" alt="" />
                </a>
              )}

              {twitter && (
                <a href={twitter}>
                  <img src="/assets/Banner/svg/tw.svg" alt="" />
                </a>
              )}

              {website && (
                <a href={website}>
                  <img src="/assets/Banner/svg/win.svg" alt="" />
                </a>
              )}
            </div>

            <Link href={href} passHref>
              <a className={s.btnMore}>MORE DETAIL</a>
            </Link>
          </div>
        </div>

        {/* <Link href={href} passHref> */}
        <a className={s.imgGame}>
          <img src={banner ?? ""} alt="" />
        </a>
        {/* </Link> */}
      </div>
    </div>
  );
}
