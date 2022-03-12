import { Maybe } from "graphql/jsutils/Maybe";
import { useCountDown } from "utils/Time";
import s from "./SilderBanner.module.sass";
type Props = {
  status: string;
  time: string;
  logo: Maybe<string> | undefined;
  desc: Maybe<string> | undefined;
  href: string;
};

export default function ItemSliderBanner(props: Props) {
  const { status, time, logo, desc, href } = props;
  const timer = useCountDown(time);

  return (
    <div className={`${s.contentItemSilder} lucis-container`}>
      <div className={s.contentDetail}>
        {/* <div className={s.bgItemSlider}></div> */}
        <div className={s.headingItem}>
          <div className={s.contentItemTop}>
            <div className={s.statusGame}>{status}</div>
            <div className={s.Time}>{`${timer.days}d ${timer.hours}h ${timer.minutes}m ${
              timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`
            }s`}</div>
          </div>
          {/* status game */}
          <div className={s.logoGame}>
            {/* @ts-ignore */}
            <img src={logo} alt="" />
          </div>
          {/* logo game */}
          <p>{desc}</p>
          {/* text */}
          <div className={s.contentItemBottom}>
            <div className={s.groupLink}>
              <a href="#">
                <img src="/assets/Banner/svg/fb.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/Banner/svg/dis.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/Banner/svg/tele.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/Banner/svg/tw.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/Banner/svg/win.svg" alt="" />
              </a>
            </div>
            <a href={href} className={s.btnMore}>
              MORE DETAIL
            </a>
          </div>
        </div>
        <div className={s.imGame}>
          <img src="/assets/Banner/im_Thetan.png" alt="" />
        </div>
      </div>
    </div>
  );
}
