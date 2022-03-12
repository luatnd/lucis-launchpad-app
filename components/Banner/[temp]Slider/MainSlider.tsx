import s from "../Banner.module.sass";
import { GBoxCampaign } from "src/generated/graphql";
import { useCountDown } from "utils/Time";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
};

const MainSlider = (props: Props) => {
  const { data, slideIndex } = props;
  //   console.log(data);
  const timer = useCountDown(data[slideIndex].end);

  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index} className={`${slideIndex == index ? s.active : s.hidden}`}>
              <div className={s.mainSliderContainer}>
                <div className={`${s.descContainer}`}>
                  <div className={`${s.statusContainer} flex justify-between`}>
                    <p className={s.status}>{item.status ? item.status : "UPCOMING"}</p>
                    <p className={s.countDown}>{`${timer.days}d ${timer.hours}h ${timer.minutes}m ${
                      timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`
                    }s`}</p>
                  </div>

                  <div className={s.descContainer}>
                    <div className={s.logo}>
                      <img src={item.game.logo ?? ''} alt="" />
                    </div>

                    <p>{item.desc}</p>
                  </div>

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
                    <a className={s.btnMore}>MORE DETAIL</a>
                  </div>
                </div>

                <div className={s.bannerContainer}>
                  <img src={item.banner_img ?? ''} alt="" />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MainSlider;
